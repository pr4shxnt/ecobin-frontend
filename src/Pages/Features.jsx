import React, { useState } from "react";
import { 
  Camera, 
  Brain, 
  BarChart3, 
  Smartphone, 
  Shield, 
  Zap, 
  Users, 
  Globe,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Features = () => {
  const [activeTab, setActiveTab] = useState("ai-sorting");

  const features = {
    "ai-sorting": {
      title: "AI-Powered Waste Sorting",
      description: "Advanced machine learning algorithms that automatically identify and categorize waste items with 95% accuracy.",
      icon: <Brain className="w-12 h-12" />,
      details: [
        "Real-time image recognition",
        "Multi-material classification",
        "Continuous learning algorithms",
        "Instant sorting recommendations"
      ]
    },
    "mobile-app": {
      title: "Mobile Application",
      description: "User-friendly mobile app that makes waste management accessible anywhere, anytime.",
      icon: <Smartphone className="w-12 h-12" />,
      details: [
        "Cross-platform compatibility",
        "Offline functionality",
        "Push notifications",
        "User-friendly interface"
      ]
    },
    "analytics": {
      title: "Advanced Analytics",
      description: "Comprehensive insights into waste patterns, recycling rates, and environmental impact.",
      icon: <BarChart3 className="w-12 h-12" />,
      details: [
        "Real-time data visualization",
        "Custom reporting tools",
        "Trend analysis",
        "Environmental impact metrics"
      ]
    },
    "security": {
      title: "Data Security",
      description: "Enterprise-grade security measures to protect user data and maintain privacy.",
      icon: <Shield className="w-12 h-12" />,
      details: [
        "End-to-end encryption",
        "GDPR compliance",
        "Regular security audits",
        "Secure cloud infrastructure"
      ]
    }
  };

  const benefits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Increased Efficiency",
      description: "Reduce sorting time by up to 80% with automated waste classification"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Better Engagement",
      description: "Gamified experience encourages consistent recycling habits"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Environmental Impact",
      description: "Track and measure your contribution to sustainability goals"
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Compliance Ready",
      description: "Meet regulatory requirements with detailed waste tracking"
    }
  ];

  const pricing = [
    {
      name: "Basic",
      price: "Free",
      features: [
        "Basic waste sorting",
        "Mobile app access",
        "Community support",
        "Basic analytics"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "$9.99/month",
      features: [
        "Advanced AI sorting",
        "Detailed analytics",
        "Priority support",
        "Custom reports",
        "API access"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: [
        "Everything in Pro",
        "White-label solutions",
        "Dedicated support",
        "Custom integrations",
        "SLA guarantees"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Hero Section */}
      <div className="pt-32 pb-16 bg-gradient-to-r from-[#3a563f] to-green-700">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Powerful Features
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Discover how our AI-powered platform transforms waste management 
            into an intelligent, efficient, and engaging experience.
          </p>
        </div>
      </div>

      {/* Features Tabs */}
      <div className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Core Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore the technology that makes Ecobin the leading waste management solution.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.keys(features).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === key
                    ? "bg-[#3a563f] text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-green-50 hover:text-[#3a563f]"
                }`}
              >
                {features[key].title}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-20 h-20 bg-[#3a563f] rounded-2xl flex items-center justify-center text-white mb-6">
                  {features[activeTab].icon}
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {features[activeTab].title}
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  {features[activeTab].description}
                </p>
                <ul className="space-y-3">
                  {features[activeTab].details.map((detail, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#3a563f] flex-shrink-0" />
                      <span className="text-gray-700">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-[#3a563f] to-green-600 rounded-2xl shadow-2xl">
                  <div className="absolute inset-0 bg-black bg-opacity-20 rounded-2xl"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-24 h-24 text-white opacity-80" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Ecobin?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform delivers measurable benefits for individuals, businesses, and communities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-[#3a563f] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-white">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="py-20 bg-gradient-to-r from-[#3a563f] to-green-700">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Simple Pricing
            </h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Choose the plan that fits your needs. Start free and upgrade as you grow.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {pricing.map((plan, index) => (
              <div key={index} className={`bg-white rounded-2xl p-8 relative ${
                plan.popular ? 'ring-4 ring-yellow-400 transform scale-105' : ''
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-[#3a563f] mb-2">{plan.price}</div>
                  {plan.price !== "Free" && <p className="text-gray-600">per month</p>}
                </div>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-[#3a563f] flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-[#3a563f] text-white hover:bg-green-700 transform hover:scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already making a difference with Ecobin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/landlord-register"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#3a563f] text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </a>
            <a 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#3a563f] text-[#3a563f] font-semibold rounded-full hover:bg-[#3a563f] hover:text-white transition-all duration-300"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
