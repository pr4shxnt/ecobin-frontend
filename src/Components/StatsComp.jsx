import React from "react";
import { Users, Globe, TrendingUp, Award } from "lucide-react";

const StatsComp = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      number: "10,000+",
      label: "Active Users",
      description: "Join our growing community"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      number: "50+",
      label: "Cities Covered",
      description: "Making impact worldwide"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      number: "95%",
      label: "Accuracy Rate",
      description: "AI-powered precision"
    },
    {
      icon: <Award className="w-8 h-8" />,
      number: "1M+",
      label: "Items Sorted",
      description: "Waste properly classified"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how Ecobin is making a difference in waste management across the globe.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#3a563f] to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <div className="text-white">
                  {stat.icon}
                </div>
              </div>
              <div className="text-4xl lg:text-5xl font-bold text-[#3a563f] mb-2">
                {stat.number}
              </div>
              <div className="text-xl font-semibold text-gray-900 mb-2">
                {stat.label}
              </div>
              <div className="text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsComp;
