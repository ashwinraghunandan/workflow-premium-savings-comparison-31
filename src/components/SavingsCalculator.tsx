import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ArrowUp, ArrowDown } from 'lucide-react';
import CostComparisonChart from './CostComparisonChart';
interface PlanTier {
  name: string;
  monthlyFee: number;
  includedExecutions: number;
  overageRate: number;
  features: string[];
}
interface CompetitorPlan {
  tool: string;
  plan: string;
  monthlyTasks: number;
  monthlyPrice: number;
  perExecutionCost: number;
  overageMultiplier: number;
}
const newPlans: PlanTier[] = [{
  name: 'Free',
  monthlyFee: 0,
  includedExecutions: 100,
  overageRate: 0.01,
  features: ['100 executions/month', 'Community support']
}, {
  name: 'Starter',
  monthlyFee: 10,
  includedExecutions: 10000,
  overageRate: 0.008,
  features: ['10,000 executions/month', 'Email support', 'Basic analytics']
}, {
  name: 'Growth',
  monthlyFee: 25,
  includedExecutions: 30000,
  overageRate: 0.005,
  features: ['30,000 executions/month', 'Priority support', 'Advanced analytics']
}, {
  name: 'Scale',
  monthlyFee: 50,
  includedExecutions: 65000,
  overageRate: 0.004,
  features: ['65,000 executions/month', 'Dedicated support', 'Custom integrations']
}];
const competitorPlans: CompetitorPlan[] = [
// Zapier plans
{
  tool: 'Zapier',
  plan: 'Free',
  monthlyTasks: 100,
  monthlyPrice: 0,
  perExecutionCost: 0,
  overageMultiplier: 1.0
}, {
  tool: 'Zapier',
  plan: 'Professional',
  monthlyTasks: 750,
  monthlyPrice: 29.99,
  perExecutionCost: 0.04998,
  overageMultiplier: 1.0
}, {
  tool: 'Zapier',
  plan: 'Professional',
  monthlyTasks: 2000,
  monthlyPrice: 73.50,
  perExecutionCost: 0.04594,
  overageMultiplier: 1.0
}, {
  tool: 'Zapier',
  plan: 'Professional',
  monthlyTasks: 5000,
  monthlyPrice: 133.50,
  perExecutionCost: 0.03338,
  overageMultiplier: 1.0
}, {
  tool: 'Zapier',
  plan: 'Professional',
  monthlyTasks: 10000,
  monthlyPrice: 193.50,
  perExecutionCost: 0.02419,
  overageMultiplier: 1.0
}, {
  tool: 'Zapier',
  plan: 'Professional',
  monthlyTasks: 50000,
  monthlyPrice: 433.50,
  perExecutionCost: 0.01084,
  overageMultiplier: 1.0
}, {
  tool: 'Zapier',
  plan: 'Team',
  monthlyTasks: 2000,
  monthlyPrice: 103.50,
  perExecutionCost: 0.06469,
  overageMultiplier: 1.0
}, {
  tool: 'Zapier',
  plan: 'Team',
  monthlyTasks: 5000,
  monthlyPrice: 178.50,
  perExecutionCost: 0.04463,
  overageMultiplier: 1.0
}, {
  tool: 'Zapier',
  plan: 'Team',
  monthlyTasks: 10000,
  monthlyPrice: 253.50,
  perExecutionCost: 0.03169,
  overageMultiplier: 1.0
}, {
  tool: 'Zapier',
  plan: 'Team',
  monthlyTasks: 50000,
  monthlyPrice: 598.50,
  perExecutionCost: 0.01496,
  overageMultiplier: 1.0
},
// Make (Pro) plans
{
  tool: 'Make',
  plan: 'Pro',
  monthlyTasks: 10000,
  monthlyPrice: 18.82,
  perExecutionCost: 0.0019,
  overageMultiplier: 1.0
}, {
  tool: 'Make',
  plan: 'Pro',
  monthlyTasks: 20000,
  monthlyPrice: 34.12,
  perExecutionCost: 0.0017,
  overageMultiplier: 1.0
}, {
  tool: 'Make',
  plan: 'Pro',
  monthlyTasks: 40000,
  monthlyPrice: 62.35,
  perExecutionCost: 0.0016,
  overageMultiplier: 1.0
}, {
  tool: 'Make',
  plan: 'Pro',
  monthlyTasks: 80000,
  monthlyPrice: 107.06,
  perExecutionCost: 0.0013,
  overageMultiplier: 1.0
},
// n8n plans
{
  tool: 'n8n',
  plan: 'Starter',
  monthlyTasks: 2500,
  monthlyPrice: 26.16,
  perExecutionCost: 0.0105,
  overageMultiplier: 1.0
}, {
  tool: 'n8n',
  plan: 'Pro',
  monthlyTasks: 10000,
  monthlyPrice: 65.40,
  perExecutionCost: 0.0065,
  overageMultiplier: 1.0
}, {
  tool: 'n8n',
  plan: 'Pro',
  monthlyTasks: 50000,
  monthlyPrice: 156.96,
  perExecutionCost: 0.0031,
  overageMultiplier: 1.0
}, {
  tool: 'n8n',
  plan: 'Pro',
  monthlyTasks: 75000,
  monthlyPrice: 211.46,
  perExecutionCost: 0.0028,
  overageMultiplier: 1.0
}, {
  tool: 'n8n',
  plan: 'Pro',
  monthlyTasks: 100000,
  monthlyPrice: 265.96,
  perExecutionCost: 0.0027,
  overageMultiplier: 1.0
}];
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

        {/* Savings Summary */}
        <div className="mb-12">
          <Card className="border border-hl-blue2 rounded-xl shadow-sm max-w-2xl mx-auto bg-white">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-center text-hl-space">Your Monthly Savings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-2 text-center mb-6">
                <div className="text-4xl font-bold text-hl-space"><span className="text-sm font-normal text-hl-neutral mr-2">Upto</span>${totalMonthlySavings.toFixed(0)}</div>
                <div className="text-sm text-hl-neutral">Based on {monthlyExecutions.toLocaleString()} executions/month</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center justify-center gap-3 rounded-lg border border-border p-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-competitor-zapier" />
                  <div className="text-sm text-hl-space">Zapier</div>
                  <div className="ml-2 font-semibold text-hl-close-green">${zapierSavings.toFixed(0)}/mo</div>
                </div>
                <div className="flex items-center justify-center gap-3 rounded-lg border border-border p-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-competitor-make" />
                  <div className="text-sm text-hl-space">Make</div>
                  <div className="ml-2 font-semibold text-hl-close-green">${makeSavings.toFixed(0)}/mo</div>
                </div>
                <div className="flex items-center justify-center gap-3 rounded-lg border border-border p-4">
                  <span className="h-2.5 w-2.5 rounded-full bg-competitor-n8n" />
                  <div className="text-sm text-hl-space">n8n</div>
                  <div className="ml-2 font-semibold text-hl-close-green">${n8nSavings.toFixed(0)}/mo</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* HighLevel Banner */}
        <div className="mb-8">
          <Card className="bg-hl-blue2 border-0 rounded-xl shadow-sm">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-semibold text-hl-space mb-4">
                There is more with HighLevel
              </h2>
              <p className="text-lg text-hl-space leading-relaxed">
                Only Premium Executions count towards your monthly execution limits. All the normal actions and trigger are free to use for unlimited executions irrespective of your plan!
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Plan Details */}
        <div className="mt-8 rounded-2xl p-6 bg-hl-yellow2">
          <h2 className="text-2xl font-medium text-hl-space mb-6 text-center">
            Our Plan Recommendation: {(monthlyExecutions / 1000).toFixed(0)}k Executions
          </h2>
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