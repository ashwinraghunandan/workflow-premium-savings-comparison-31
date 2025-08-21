import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import CostComparisonChart from './CostComparisonChart';
import { newPlans, competitorPlans, type PlanTier, type CompetitorPlan } from '@/data/pricingData';
const SavingsCalculator: React.FC = () => {
  const [monthlyExecutions, setMonthlyExecutions] = useState(15000);
  const calculateNewPlanCost = (plan: PlanTier, executions: number) => {
    if (executions <= plan.includedExecutions) {
      return plan.monthlyFee;
    }
    const overage = executions - plan.includedExecutions;
    return plan.monthlyFee + overage * plan.overageRate;
  };
  const calculateCompetitorCost = (plan: CompetitorPlan, executions: number) => {
    if (executions <= plan.monthlyTasks) {
      return plan.monthlyPrice;
    }
    const overage = executions - plan.monthlyTasks;
    const overageRate = plan.perExecutionCost * plan.overageMultiplier;
    return plan.monthlyPrice + overage * overageRate;
  };
  const getBestCompetitorPlan = (tool: string) => {
    const toolPlans = competitorPlans.filter(plan => plan.tool === tool);
    const viablePlans = toolPlans.filter(plan => {
      if (monthlyExecutions <= plan.monthlyTasks) return true;
      if (plan.perExecutionCost > 0) return true;
      return false;
    });
    return viablePlans.reduce((best, current) => {
      const currentCost = calculateCompetitorCost(current, monthlyExecutions);
      const bestCost = calculateCompetitorCost(best, monthlyExecutions);
      return currentCost < bestCost ? current : best;
    });
  };
  const calculations = useMemo(() => {
    const bestPlan = newPlans.reduce((best, current) => {
      const currentCost = calculateNewPlanCost(current, monthlyExecutions);
      const bestCost = calculateNewPlanCost(best, monthlyExecutions);
      return currentCost < bestCost ? current : best;
    });
    const bestZapierPlan = getBestCompetitorPlan('Zapier');
    const bestMakePlan = getBestCompetitorPlan('Make');
    const bestN8nPlan = getBestCompetitorPlan('n8n');
    const ourCost = calculateNewPlanCost(bestPlan, monthlyExecutions);
    const zapierCost = calculateCompetitorCost(bestZapierPlan, monthlyExecutions);
    const makeCost = calculateCompetitorCost(bestMakePlan, monthlyExecutions);
    const n8nCost = calculateCompetitorCost(bestN8nPlan, monthlyExecutions);
    return {
      bestPlan,
      ourCost,
      zapierCost,
      makeCost,
      n8nCost,
      zapierSavings: zapierCost - ourCost,
      makeSavings: makeCost - ourCost,
      n8nSavings: n8nCost - ourCost
    };
  }, [monthlyExecutions]);
  const {
    bestPlan,
    ourCost,
    zapierCost,
    makeCost,
    n8nCost,
    zapierSavings,
    makeSavings,
    n8nSavings
  } = calculations;
  const totalMonthlySavings = Math.max(zapierSavings, makeSavings, n8nSavings);
  const handleSliderChange = (value: number[]) => {
    setMonthlyExecutions(value[0]);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    // Round to nearest 5k increment
    const rounded = Math.round(value / 5000) * 5000;
    setMonthlyExecutions(Math.max(0, Math.min(100000, rounded)));
  };
  const adjustExecutions = (delta: number) => {
    setMonthlyExecutions(prev => Math.max(0, Math.min(100000, prev + delta)));
  };

  // Slider marks helpers (aligned to 5k increments starting from 0)
  const markValues = [0, 5000, 10000, 25000, 50000, 100000];
  const formatMark = (v: number) => `${(v / 1000).toFixed(0)}k`;

  // Free steps data for proof block
  const freeStepsData = [{
    step: 'If/Else',
    percentage: 19.41
  }, {
    step: 'Wait',
    percentage: 19.39
  }, {
    step: 'Go To',
    percentage: 9.76
  }, {
    step: 'Email',
    percentage: 9.71
  }, {
    step: 'Add Contact Tag',
    percentage: 4.50
  }, {
    step: 'Update Contact Tag',
    percentage: 4.03
  }, {
    step: 'SMS',
    percentage: 3.09
  }, {
    step: 'Drip',
    percentage: 2.70
  }, {
    step: 'Create Opportunity',
    percentage: 2.59
  }, {
    step: 'Math Operation',
    percentage: 2.55
  }];
  return <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 rounded-2xl p-10 bg-slate-900">
          <div className="flex justify-center mb-6">
            <img src="/lovable-uploads/8bea8cef-56fd-47dc-bad4-a5780820e739.png" alt="Company logo" className="h-16 w-auto" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            Stop Overpaying for Automations — Instantly See How Much You Can <span className="text-hl-teal">Save</span> with <span className="text-hl-teal">HighLevel</span>
          </h1>
          <p className="text-xl font-semibold text-white mb-2">
            Same workflows. Bigger savings. Adjust the slider and watch your monthly costs drop.
          </p>
          
        </div>

        {/* Controls + Chart Card */}
        <Card className="mb-8 border border-hl-blue2 bg-white shadow-sm rounded-xl">
          <CardHeader className="pb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle className="text-xl font-medium text-hl-space">Monthly Cost Analysis</CardTitle>
              
              {/* Current executions display */}
              <div className="text-lg font-medium text-hl-neutral">
                {monthlyExecutions.toLocaleString()} executions
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            {/* Dynamic instruction above chart */}
            <div className="text-center mb-6">
              <p className="text-lg font-medium text-hl-neutral">
                Drag the slider to see your exact monthly savings at different execution levels.
              </p>
            </div>
            
            <CostComparisonChart currentExecutions={monthlyExecutions} />
            
            {/* Dynamic content below chart */}
            <div className="text-center mt-6 mb-8">
              {monthlyExecutions < 10000 ? <p className="text-lg text-hl-space">
                  Even at low volumes, HighLevel beats the competition — saving you <span className="font-bold text-hl-close-green">${Math.max(zapierSavings, makeSavings, n8nSavings).toFixed(0)}</span> every month.
                </p> : monthlyExecutions >= 10000 ? <p className="text-lg text-hl-space">
                  At <span className="font-medium">{(monthlyExecutions / 1000).toFixed(0)}k</span> executions, you're saving upto <span className="font-bold text-hl-close-green">${Math.max(zapierSavings, makeSavings, n8nSavings).toFixed(0)}</span> per month — that's <span className="font-bold text-hl-close-green">${(Math.max(zapierSavings, makeSavings, n8nSavings) * 12).toFixed(0)}</span>/year back in your budget.
                </p> : <p className="text-lg text-hl-space">
                  At <span className="font-medium">{(monthlyExecutions / 1000).toFixed(0)}k</span> executions, HighLevel still costs less than most competitors' entry plans — saving you <span className="font-bold text-hl-close-green">${Math.max(zapierSavings, makeSavings, n8nSavings).toFixed(0)}</span> every month.
                </p>}
            </div>
            
            {/* Slider Section */}
            <div className="mt-8">
              <h3 className="text-lg font-medium text-foreground mb-4">No. of Executions</h3>
              <div style={{
              ['--primary' as any]: 'var(--hl-sky-blue)',
              ['--secondary' as any]: 'var(--bg-blue-2)',
              ['--ring' as any]: 'var(--hl-sky-blue)'
            }}>
                <Slider value={[monthlyExecutions]} onValueChange={handleSliderChange} max={100000} min={0} step={5000} className="w-full" />
              </div>
              <div className="relative mt-2 h-6">
                {markValues.map(v => {
                const percent = v / 100000 * 100;
                return <div key={v} className="absolute inset-y-0 text-xs text-muted-foreground" style={{
                  left: `${percent}%`,
                  transform: "translateX(-50%)"
                }}>
                      <div className="h-2 w-px bg-border mx-auto mb-1" />
                      <span>{formatMark(v)}</span>
                    </div>;
              })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comparison Cards */}
        <div className="mb-8 rounded-2xl p-6 bg-blue-950">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Our Platform */}
            <Card className="relative rounded-xl shadow-sm bg-white border border-hl-blue2">
              {bestPlan && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="text-white text-xs px-3 py-1 bg-slate-800">
                    Best Value
                  </Badge>
                </div>}
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/lovable-uploads/1ae9f382-fe45-4e60-b9c8-992cfee753f3.png" alt="HighLevel logo" className="w-8 h-8" />
                  <div>
                    <h3 className="text-sm font-medium text-hl-space">HighLevel</h3>
                  </div>
                </div>
                <div className="text-2xl font-semibold text-hl-space mb-2">
                  ${ourCost.toFixed(0)} / month
                </div>
                <div className="text-sm text-hl-neutral mb-2">
                  Includes {bestPlan?.includedExecutions.toLocaleString()} executions/month
                </div>
                <div className="text-xs text-hl-neutral">
                  All standard actions are unlimited — and free!
                </div>
              </CardContent>
            </Card>

            {/* Zapier */}
            <Card className="border border-hl-blue2 rounded-xl shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
                    <img src="/lovable-uploads/5a98a1bb-aa2f-495e-a40f-a384d9547521.png" alt="Zapier logo" className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-hl-space">Zapier</h3>
                  </div>
                </div>
                <div className="text-2xl font-semibold text-hl-space mb-2">
                  ${zapierCost.toFixed(0)} / month
                </div>
                <div className="text-sm font-medium text-rose-600 mb-1">
                  ${zapierSavings.toFixed(0)} more than HighLevel
                </div>
                <div className="text-xs text-hl-neutral">
                  at {monthlyExecutions.toLocaleString()} executions/mo
                </div>
              </CardContent>
            </Card>

            {/* n8n */}
            <Card className="border border-hl-blue2 rounded-xl shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
                    <img src="/lovable-uploads/639f0b92-ffa4-4c32-bc5d-06beb4e69fbb.png" alt="n8n logo" className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-hl-space">n8n</h3>
                  </div>
                </div>
                <div className="text-2xl font-semibold text-hl-space mb-2">
                  ${n8nCost.toFixed(0)} / month
                </div>
                <div className="text-sm font-medium text-rose-600 mb-1">
                  ${n8nSavings.toFixed(0)} more than HighLevel
                </div>
                <div className="text-xs text-hl-neutral">
                  at {monthlyExecutions.toLocaleString()} executions/mo
                </div>
              </CardContent>
            </Card>

            {/* Make */}
            <Card className="border border-hl-blue2 rounded-xl shadow-sm bg-white">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
                    <img src="/lovable-uploads/f90f2a95-8d93-480a-8102-c52e999a47e5.png" alt="Make logo" className="w-6 h-6 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-hl-space">Make</h3>
                  </div>
                </div>
                <div className="text-2xl font-semibold text-hl-space mb-2">
                  ${makeCost.toFixed(0)} / month
                </div>
                <div className="text-sm font-medium text-rose-600 mb-1">
                  ${makeSavings.toFixed(0)} more than HighLevel
                </div>
                <div className="text-xs text-hl-neutral">
                  at {monthlyExecutions.toLocaleString()} executions/mo
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Free Steps Proof Block */}
        <div className="mb-8">
          <Card className="border border-hl-blue2 rounded-xl shadow-sm max-w-4xl mx-auto bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-center text-hl-space">Standard actions shouldn't cost extra. With HighLevel, they don't.</CardTitle>
              <p className="text-center text-hl-neutral mt-2">~98% of real-world workflow steps are unlimited and always included at no extra cost.</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 max-w-2xl mx-auto">
                {freeStepsData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-1">
                    <span className="text-sm text-hl-space">{item.step}</span>
                    <span className="text-sm font-medium text-hl-neutral">{item.percentage}%</span>
                  </div>
                ))}
              </div>
              <div className="text-xs text-muted-foreground text-center mt-4 pt-4 border-t">
                Based on HighLevel internal usage data; "free" = standard actions.
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workflows Premium Disclaimer */}
        <div className="mb-8 text-center max-w-4xl mx-auto">
          <p className="text-sm text-muted-foreground">
            <strong>Workflows Premium is an add-on that only bills for premium triggers & actions (e.g., Google Sheets, Slack, Custom/Webhooks, Array Functions, Workflow AI). Standard workflow steps are included with your base plan and don't count toward your monthly allowance.</strong>
          </p>
        </div>

        {/* HighLevel Banner */}
        <div className="mb-8">
          <Card className="bg-hl-blue2 border-0 rounded-xl shadow-sm">
            
          </Card>
        </div>

        {/* Plan Details */}
        <div className="mt-8 rounded-2xl p-6 bg-hl-yellow2">
          <h2 className="text-2xl font-medium text-hl-space mb-2 text-center">
            Workflow Premium - Recommended Plans ({(monthlyExecutions / 1000).toFixed(0)}k executions)
          </h2>
          <p className="text-center text-hl-neutral mb-6">
            Only premium actions consume executions. Standard steps are included with your base plan and don't count.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newPlans.map(plan => {
            const cost = calculateNewPlanCost(plan, monthlyExecutions);
            const isRecommended = plan.name === bestPlan?.name;
            return <Card key={plan.name} className={`relative rounded-xl shadow-sm bg-white ${isRecommended ? 'border-2 border-hl-space' : 'border border-hl-blue2'}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium text-hl-space">{plan.name}</CardTitle>
                      {isRecommended && <Badge variant="default" className="text-xs text-white bg-slate-800">Best Value</Badge>}
                    </div>
                  </CardHeader>
                   <CardContent className="pt-0">
                     <div className="text-3xl font-semibold text-hl-space mb-6">
                       ${plan.monthlyFee}
                       <span className="text-lg font-normal text-hl-neutral">/month</span>
                     </div>
                     
                     <div className="space-y-3 text-sm">
                        <div className="text-hl-neutral">
                         {plan.name === 'Free' ? '100 free lifetime executions' : `Includes ${plan.includedExecutions.toLocaleString()} executions/month`}
                       </div>
                       
                        <div className="text-hl-neutral">
                         Overage rate: ${plan.overageRate} per execution
                       </div>
                       
                       <div className="font-medium text-foreground pt-3 border-t border-border">
                         Total estimated: ${cost.toFixed(2)}/month
                       </div>
                     </div>
                   </CardContent>
                </Card>;
          })}
          </div>
        </div>

        {/* End-of-page Banner */}
        <div className="mt-12">
          <Card className="rounded-xl shadow-lg border-0" style={{
          backgroundImage: 'var(--footer-cta-gradient)'
        }}>
            
          </Card>
        </div>
      </div>
    </section>;
};
export default SavingsCalculator;