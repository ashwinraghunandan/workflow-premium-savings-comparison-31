
import React from 'react';
import { Check, X, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface PricingTier {
  name: string;
  price: number;
  executions: number;
  overageRate: number;
  features: string[];
  limitations: string[];
  popular?: boolean;
  buttonText: string;
  color: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: 0,
    executions: 5000,
    overageRate: 0.01,
    features: [
      '5,000 executions/month',
      'All Premium Actions',
      'Webhooks included',
      'Basic support'
    ],
    limitations: [
      'No Marketplace Apps',
      'Overage: $0.01 per execution'
    ],
    buttonText: 'Start Free',
    color: 'from-green-500 to-green-600'
  },
  {
    name: 'Starter',
    price: 10,
    executions: 10000,
    overageRate: 0.008,
    features: [
      '10,000 executions/month',
      'All Premium Actions',
      'Marketplace Apps included',
      'Priority support',
      '20% lower overage rate'
    ],
    limitations: [],
    popular: true,
    buttonText: '14 DAY FREE TRIAL',
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Growth',
    price: 25,
    executions: 30000,
    overageRate: 0.006,
    features: [
      '30,000 executions/month',
      'All Premium Actions',
      'Marketplace Apps included',
      'Revenue sharing with partners',
      '50% lower overage rate',
      'Advanced analytics'
    ],
    limitations: [],
    buttonText: '14 DAY FREE TRIAL',
    color: 'from-orange-500 to-orange-600'
  },
  {
    name: 'Scale',
    price: 50,
    executions: 65000,
    overageRate: 0.004,
    features: [
      '65,000 executions/month',
      'All Premium Actions',
      'Marketplace Apps included',
      'Revenue sharing with partners',
      '60% lower overage rate',
      'Advanced analytics',
      'Dedicated support'
    ],
    limitations: [],
    buttonText: '14 DAY FREE TRIAL',
    color: 'from-purple-500 to-purple-600'
  }
];

const PricingTable = () => {
  return (
    <section className="py-20 px-6 bg-hl-yellow2">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-hl-space mb-4">
            Choose Your Workflow Pricing Plan
          </h2>
          <p className="text-xl text-hl-neutral max-w-3xl mx-auto">
            Scale your automation with our new freemium model. No more double charging, 
            transparent pricing, and volume discounts that grow with your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricingTiers.map((tier) => (
            <Card 
              key={tier.name} 
              className={`relative ${
                tier.popular ? 'border-2 border-hl-space shadow-2xl' : 'border border-hl-blue2'
              } bg-white`}
            >
          {tier.popular && (
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <Badge className="bg-hl-teal text-white px-4 py-1 text-sm font-semibold">
                Best Value
              </Badge>
            </div>
          )}
              
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-2xl font-bold text-hl-space">{tier.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-hl-space">${tier.price}</span>
                  <span className="text-hl-neutral">/month</span>
                </div>
                <p className="text-hl-neutral mt-2">
                  {tier.executions.toLocaleString()} executions included
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4 mb-8">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-hl-neutral text-sm">{feature}</span>
                    </div>
                  ))}
                  
                  {tier.limitations.map((limitation, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="text-hl-neutral text-sm">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full font-semibold py-3"
                  variant="cta"
                >
                  {tier.buttonText}
                </Button>

                {tier.overageRate && (
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Overage: ${tier.overageRate} per execution
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="mb-6">
            <Link to="/cost-comparison">
              <Button 
                size="lg"
                className="px-8 py-4 text-lg font-semibold bg-primary text-white hover:opacity-90 mb-4"
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                Compare Costs vs Competitors
              </Button>
            </Link>
          </div>
          <p className="text-hl-neutral mb-4">
            Need more than 65,000 executions? Contact us for enterprise pricing.
          </p>
          <Button 
            variant="outline" 
            className="border-white text-white hover:bg-white hover:text-gray-900"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
