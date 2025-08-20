
import React from 'react';
import { LineChart, Line, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart } from 'recharts';
import { newPlans, competitorPlans, type PlanTier, type CompetitorPlan } from '@/data/pricingData';

interface CostComparisonChartProps {
  currentExecutions: number;
}


const CostComparisonChart: React.FC<CostComparisonChartProps> = ({ currentExecutions }) => {
  const calculateNewPlanCost = (plan: PlanTier, executions: number) => {
    if (executions <= plan.includedExecutions) {
      return plan.monthlyFee;
    }
    const overage = executions - plan.includedExecutions;
    return plan.monthlyFee + (overage * plan.overageRate);
  };

  const calculateCompetitorCost = (plan: CompetitorPlan, executions: number) => {
    if (executions <= plan.monthlyTasks) {
      return plan.monthlyPrice;
    }
    const overage = executions - plan.monthlyTasks;
    const overageRate = plan.perExecutionCost * plan.overageMultiplier;
    return plan.monthlyPrice + (overage * overageRate);
  };

  const getBestPlan = (plans: PlanTier[], executions: number) => {
    return plans.reduce((best, current) => {
      const currentCost = calculateNewPlanCost(current, executions);
      const bestCost = calculateNewPlanCost(best, executions);
      return currentCost < bestCost ? current : best;
    });
  };

  const getBestCompetitorPlan = (tool: string, executions: number) => {
    const toolPlans = competitorPlans.filter(plan => plan.tool === tool);
    
    const viablePlans = toolPlans.filter(plan => {
      if (executions <= plan.monthlyTasks) return true;
      if (plan.perExecutionCost > 0) return true;
      return false;
    });

    return viablePlans.reduce((best, current) => {
      const currentCost = calculateCompetitorCost(current, executions);
      const bestCost = calculateCompetitorCost(best, executions);
      return currentCost < bestCost ? current : best;
    });
  };

  // Generate data points for the chart
  const generateChartData = () => {
    const dataPoints = [];
    const maxExecutions = Math.max(100000, currentExecutions + 20000);

    // Use 5k increments starting from 0
    for (let executions = 0; executions <= maxExecutions; executions += 5000) {
      // Skip 0 for cost calculations since plans don't make sense at 0 executions
      const calculationExecutions = executions === 0 ? 100 : executions;
      
      const bestOurPlan = getBestPlan(newPlans, calculationExecutions);
      const bestZapierPlan = getBestCompetitorPlan('Zapier', calculationExecutions);
      const bestMakePlan = getBestCompetitorPlan('Make', calculationExecutions);
      const bestN8nPlan = getBestCompetitorPlan('n8n', calculationExecutions);

      const ourCost = calculateNewPlanCost(bestOurPlan, calculationExecutions);
      const zapierCost = calculateCompetitorCost(bestZapierPlan, calculationExecutions);
      const makeCost = calculateCompetitorCost(bestMakePlan, calculationExecutions);
      const n8nCost = calculateCompetitorCost(bestN8nPlan, calculationExecutions);

      dataPoints.push({
        executions,
        'HighLevel': ourCost,
        'Zapier': zapierCost,
        'Make': makeCost,
        'n8n': n8nCost,
      });
    }

    return dataPoints;
  };

  const chartData = generateChartData();

  const formatCurrency = (value: number) => `$${value.toFixed(0)}`;
  const formatExecutions = (value: number) => `${(value / 1000).toFixed(0)}k`;

  return (
    <div className="w-full h-80 bg-white rounded-xl border border-border">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 24, right: 24, left: 24, bottom: 24 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" strokeWidth={1} />
          <XAxis 
            dataKey="executions" 
            tickFormatter={formatExecutions}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            tickFormatter={formatCurrency}
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip 
            formatter={(value: number, name: string, props: any) => {
              const dataPoint = props.payload;
              const highLevelCost = dataPoint?.['HighLevel'] || 0;
              const difference = value - highLevelCost;
              
              return [
                formatCurrency(value), 
                name === 'HighLevel' ? name : `${name}`,
                name === 'HighLevel' ? '' : `$${difference.toFixed(0)} more than HighLevel`
              ];
            }}
            labelFormatter={(label: number) => `${formatExecutions(label)} executions`}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              fontSize: '14px'
            }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '16px', fontSize: '14px' }}
            formatter={(value) => <span style={{ fontWeight: value === 'HighLevel' ? '600' : '400' }}>{value}</span>}
          />
          <defs>
            <linearGradient id="ourPlatformGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.12}/>
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Area 
            type="monotone" 
            dataKey="HighLevel" 
            stroke="hsl(var(--primary))" 
            fill="url(#ourPlatformGradient)"
            strokeWidth={2.25}
            dot={{ fill: 'hsl(var(--primary))', strokeWidth: 0, r: 0 }}
            activeDot={{ r: 5, stroke: 'hsl(var(--primary))', strokeWidth: 2, fill: 'white' }}
          />
          <Line 
            type="monotone" 
            dataKey="Zapier" 
            stroke="hsl(var(--zapier))" 
            strokeWidth={1.25}
            dot={{ fill: 'hsl(var(--zapier))', strokeWidth: 0, r: 0 }}
            activeDot={{ r: 4, stroke: 'hsl(var(--zapier))', strokeWidth: 2, fill: 'white' }}
          />
          <Line 
            type="monotone" 
            dataKey="Make" 
            stroke="hsl(var(--make))" 
            strokeWidth={1.25}
            dot={{ fill: 'hsl(var(--make))', strokeWidth: 0, r: 0 }}
            activeDot={{ r: 4, stroke: 'hsl(var(--make))', strokeWidth: 2, fill: 'white' }}
          />
          <Line 
            type="monotone" 
            dataKey="n8n" 
            stroke="hsl(var(--n8n))" 
            strokeWidth={1.25}
            dot={{ fill: 'hsl(var(--n8n))', strokeWidth: 0, r: 0 }}
            activeDot={{ r: 4, stroke: 'hsl(var(--n8n))', strokeWidth: 2, fill: 'white' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      
    </div>
  );
};

export default CostComparisonChart;
