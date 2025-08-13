
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ = () => {
  const faqs = [
    {
      question: "What's the difference between the old and new pricing model?",
      answer: "The old model charged $0.01 per execution for all premium actions and marketplace apps, with double charging issues. Our new freemium model offers a free tier with 5,000 executions, transparent tiered pricing, and no more double charging for marketplace apps."
    },
    {
      question: "Do I get charged twice for marketplace apps?",
      answer: "No! Unlike the old model, marketplace app executions are now counted within your plan's execution limit. There's no additional $0.01 charge per execution for marketplace apps."
    },
    {
      question: "What happens when I exceed my execution limit?",
      answer: "You'll be charged overage rates that decrease with higher tiers: Free tier ($0.01), Starter ($0.008), Growth ($0.005), and Scale ($0.004) per execution. Much better than the old flat $0.01 rate!"
    },
    {
      question: "Can I start with the Free plan?",
      answer: "Absolutely! The Free plan includes 5,000 executions per month with all Premium Actions. It's perfect for getting started and testing workflows before upgrading."
    },
    {
      question: "Are there any setup fees or contracts?",
      answer: "No setup fees and no long-term contracts required. You can upgrade, downgrade, or cancel anytime. All paid plans come with a 14-day free trial."
    },
    {
      question: "How do executions reset each month?",
      answer: "Execution limits reset on your billing cycle date each month. Unused executions don't roll over to the next month."
    },
    {
      question: "What Premium Actions are included?",
      answer: "All plans include access to webhooks, API calls, data transformations, conditional logic, and all other premium workflow actions. No feature restrictions based on plan tier."
    },
    {
      question: "How does the revenue sharing work for Growth and Scale plans?",
      answer: "For Growth and Scale plans, we share revenue with marketplace app developers instead of charging you extra execution fees. This creates a better ecosystem for everyone."
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to know about our new workflow pricing
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white border border-gray-200 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help.
          </p>
          <button 
            className="px-8 py-3 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: '#FF4E42' }}
          >
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
