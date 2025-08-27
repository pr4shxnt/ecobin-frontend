import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Play,
  Star,
  Users,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";
import logoonly from "../assets/logoonly.png";
import heroVideo from "../assets/Untitled video - Made with Clipchamp.mp4";

const HeroComp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);

  useEffect(() => {
    setIsVisible(true);

    // Auto-rotate features
    // const interval = setInterval(() => {
    //   setCurrentFeature((prev) => (prev + 1) % features.length);
    // }, 3000);

    // return () => clearInterval(interval);
  }, []);

  // const features = [
  //   {
  //     icon: <Shield className="w-6 h-6" />,
  //     title: "Smart Waste Management",
  //     description: "AI-powered sorting and monitoring"
  //   },
  //   {
  //     icon: <TrendingUp className="w-6 h-6" />,
  //     title: "Real-time Analytics",
  //     description: "Track your environmental impact"
  //   },
  //   {
  //     icon: <Zap className="w-6 h-6" />,
  //     title: "Eco-friendly Solutions",
  //     description: "Reduce waste, save the planet"
  //   }
  // ];

  return (
    <div className="bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="relative min-h-screen w-[90%] mx-auto  overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-20 pb-16">
          <div className="grid pt-16 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
            {/* Left Column - Content */}
            <div
              className={`space-y-8 transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {/* Badge */}

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Transform Your
                  <span className="text-[#3a563f] block">Waste Management</span>
                  with AI
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Join thousands of users who are making a difference with our
                  intelligent waste sorting and recycling solutions.
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/landlord-register"
                  className="inline-flex items-center justify-center px-8 py-4 bg-[#3a563f] text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Signup as landlord
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  to="/tenant-register"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-[#3a563f] hover:text-[#3a563f] transition-all duration-300"
                >
                  Signup as a tenant
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Link>
              </div>

              {/* Features Carousel */}
              {/* <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-[#3a563f]">
                    {features[currentFeature].icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {features[currentFeature].title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {features[currentFeature].description}
                    </p>
                  </div>
                </div>
              </div> */}

              {/* Stats */}
              {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-green-600">
                      {stat.number}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div> */}

              {/* Trust Indicators */}
            </div>

            {/* Right Column - Visual */}
            <div
              className={`relative transition-all duration-1000 delay-300 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              {/* Main Visual Container */}
              <div className="relative">
                {/* Video Background */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-[500px] object-cover"
                  >
                    <source src={heroVideo} type="video/mp4" />
                  </video>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                  {/* Floating Elements */}
                  <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">
                          Live Monitoring
                        </div>
                        <div className="text-xs text-gray-600">Active</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        98%
                      </div>
                      <div className="text-xs text-gray-600">Accuracy Rate</div>
                    </div>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Secure</div>
                      <div className="text-xs text-gray-600">
                        Data Protection
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Analytics
                      </div>
                      <div className="text-xs text-gray-600">
                        Real-time Data
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroComp;
