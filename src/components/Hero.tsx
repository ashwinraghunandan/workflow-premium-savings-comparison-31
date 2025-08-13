
import React from 'react';
import { TrendingUp, Zap, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="py-20 px-6 text-white" style={{ backgroundImage: 'var(--hero-gradient)' }}>
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Revolutionary 
            <span className="block text-hl-teal">
              Workflow Pricing
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto leading-relaxed">
            Say goodbye to double charging and hidden fees. Our new freemium model 
            gives you transparent pricing, volume discounts, and a free tier to get started.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Button 
            size="lg"
            variant="cta"
            className="px-8 py-4 text-lg font-semibold"
          >
            Start Free - 5,000 Executions
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="px-8 py-4 text-lg font-semibold border-white text-hl-space bg-white hover:bg-gray-100"
          >
            View Pricing Plans
          </Button>
        </div>

        {/* Key Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#47BE9F' }}
            >
              <DollarSign className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No More Double Charging</h3>
            <p className="text-gray-300">
              Marketplace apps are included in your execution count. No extra $0.01 fees.
            </p>
          </div>

          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#1E9CEE' }}
            >
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Volume Discounts</h3>
            <p className="text-gray-300">
              The more you use, the less you pay. Overage rates drop by up to 60%.
            </p>
          </div>

          <div className="text-center">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#FFD73B' }}
            >
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Free Tier Included</h3>
            <p className="text-gray-300">
              Start with 5,000 free executions monthly. Perfect for testing and small workflows.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div 
          className="mt-16 p-8 rounded-2xl bg-hl-sky"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white">60%</div>
              <div className="text-blue-100">Lower Overage Rates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">5,000</div>
              <div className="text-blue-100">Free Executions/Month</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">0</div>
              <div className="text-blue-100">Hidden Fees</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">24/7</div>
              <div className="text-blue-100">Expert Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
