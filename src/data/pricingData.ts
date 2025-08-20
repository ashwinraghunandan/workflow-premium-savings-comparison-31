// Shared pricing data for consistency across components

export interface PlanTier {
  name: string;
  monthlyFee: number;
  includedExecutions: number;
  overageRate: number;
  features?: string[];
}

export interface CompetitorPlan {
  tool: string;
  plan: string;
  monthlyTasks: number;
  monthlyPrice: number;
  perExecutionCost: number;
  overageMultiplier: number;
}

export const newPlans: PlanTier[] = [{
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

export const competitorPlans: CompetitorPlan[] = [
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