import React from "react";
import { ChevronRight, ArrowRight, Download, Users } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-green-100 to-green-200 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold text-black mb-6">
            Ready to Transform Your
            <span className="block">Waste Management?</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Join thousands of users who are already making a difference. 
            Start your journey towards sustainable waste management today.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Quick Start Card */}
          <div className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-[#3a563f] rounded-full flex items-center justify-center mx-auto mb-6">
              <Download className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Started Free</h3>
            <p className="text-gray-600 mb-6">
              No credit card required. Start sorting waste intelligently in minutes.
            </p>
            <Link
              to="/landlord-register"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#3a563f] text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300"
            >
              Start Free Trial
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          {/* Demo Card */}
          <div className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-[#3a563f] rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Request Demo</h3>
            <p className="text-gray-600 mb-6">
              See Ecobin in action with a personalized demonstration.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center w-full px-6 py-3 border-2 border-[#3a563f] text-[#3a563f] font-semibold rounded-lg hover:bg-[#3a563f] hover:text-white transition-all duration-300"
            >
              Schedule Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-[#3a563f] rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Talk to Experts</h3>
            <p className="text-gray-600 mb-6">
              Get personalized guidance from our waste management specialists.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-green-100 text-[#3a563f] font-semibold rounded-lg hover:bg-green-200 transition-all duration-300"
            >
              Contact Sales
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 lg:p-12 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Our team is here to help you find the perfect waste management solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/features"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#3a563f] text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
              >
                Explore Features
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#3a563f] text-[#3a563f] font-semibold rounded-full hover:bg-[#3a563f] hover:text-white transition-all duration-300"
              >
                Get in Touch
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
