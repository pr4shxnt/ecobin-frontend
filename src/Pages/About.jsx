import React from "react";
import { Users, Target, Award, Heart } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Hero Section */}
      <div className="pt-32 pb-16 bg-gradient-to-r from-[#3a563f] to-green-700">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            About Ecobin
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            We're revolutionizing waste management through innovative AI technology, 
            making recycling accessible and efficient for everyone.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To create a sustainable future by transforming how we handle waste. 
                Our AI-powered solutions make recycling intuitive, trackable, and 
                rewarding for individuals and communities.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe that small actions can create big change. Every piece of 
                waste properly sorted brings us closer to a cleaner, greener planet.
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-[#3a563f] to-green-600 rounded-2xl shadow-2xl">
                <div className="absolute inset-0 bg-black bg-opacity-20 rounded-2xl"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Target className="w-24 h-24 text-white opacity-80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and every decision we make.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#3a563f] rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600">Committed to environmental preservation and long-term ecological balance.</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#3a563f] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">Building stronger communities through collective environmental action.</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#3a563f] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">Delivering the highest quality solutions through continuous innovation.</p>
            </div>
            
            <div className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-[#3a563f] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Impact</h3>
              <p className="text-gray-600">Creating measurable positive change in waste management practices.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-gradient-to-r from-[#3a563f] to-green-700">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl lg:text-6xl font-bold text-white mb-2">10K+</div>
              <div className="text-green-100 text-lg">Active Users</div>
            </div>
            <div>
              <div className="text-4xl lg:text-6xl font-bold text-white mb-2">50K+</div>
              <div className="text-green-100 text-lg">Waste Items Sorted</div>
            </div>
            <div>
              <div className="text-4xl lg:text-6xl font-bold text-white mb-2">95%</div>
              <div className="text-green-100 text-lg">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
