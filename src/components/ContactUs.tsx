
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MessageCircle } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-20 px-6" style={{ backgroundColor: '#0A2448' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to scale your workflows? Have questions about pricing? 
            Our team is here to help you choose the perfect plan.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Let's Start a Conversation
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Whether you're just getting started or scaling to enterprise level, 
                we'll help you find the right workflow pricing solution for your business.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div 
                  className="p-3 rounded-full"
                  style={{ backgroundColor: '#1E9CEE' }}
                >
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email Support</h4>
                  <p className="text-gray-300">support@gohighlevel.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div 
                  className="p-3 rounded-full"
                  style={{ backgroundColor: '#47BE9F' }}
                >
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Sales Team</h4>
                  <p className="text-gray-300">1-800-GO-LEVEL</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div 
                  className="p-3 rounded-full"
                  style={{ backgroundColor: '#FFD73B' }}
                >
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Live Chat</h4>
                  <p className="text-gray-300">Available 24/7 in your dashboard</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h4 className="font-semibold text-white mb-3">Why Choose GoHighLevel?</h4>
              <ul className="space-y-2 text-gray-300">
                <li>• Transparent, no-surprise pricing</li>
                <li>• Industry-leading workflow automation</li>
                <li>• 24/7 dedicated support team</li>
                <li>• Seamless marketplace integration</li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-white shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-gray-900">
                Request a Demo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-700">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-700">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="company" className="text-gray-700">Company Name</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-700">How can we help? *</Label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tell us about your workflow needs and monthly execution volume..."
                  />
                </div>

                <Button 
                  type="submit"
                  className="w-full py-3 text-white font-semibold hover:opacity-90"
                  style={{ backgroundColor: '#FF4E42' }}
                >
                  Schedule Free Consultation
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to our privacy policy. 
                  We'll never spam you or share your information.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
