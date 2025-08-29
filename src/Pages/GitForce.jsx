import React, { useState } from "react";
import { 
  GitBranch, 
  Code, 
  Users, 
  Star, 
  GitPullRequest, 
  GitCommit, 
  TrendingUp,
  Globe,
  Download,
  BookOpen,
  MessageCircle,
  ArrowRight
} from "lucide-react";

const GitForce = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: <Globe className="w-5 h-5" /> },
    { id: "contributors", label: "Contributors", icon: <Users className="w-5 h-5" /> },
    { id: "releases", label: "Releases", icon: <Download className="w-5 h-5" /> },
    { id: "documentation", label: "Docs", icon: <BookOpen className="w-5 h-5" /> }
  ];

  const contributors = [
    { name: "Alex Johnson", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", commits: 156, role: "Core Maintainer" },
    { name: "Sarah Chen", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face", commits: 89, role: "AI Specialist" },
    { name: "Marcus Rodriguez", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", commits: 67, role: "UI/UX Lead" },
    { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", commits: 45, role: "Backend Developer" },
    { name: "David Kim", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", commits: 34, role: "DevOps Engineer" }
  ];

  const releases = [
    { version: "v2.1.0", date: "2024-01-15", title: "AI Model Improvements", description: "Enhanced waste classification accuracy and new material support" },
    { version: "v2.0.0", date: "2023-12-01", title: "Major Platform Update", description: "Complete redesign with new features and improved performance" },
    { version: "v1.8.0", date: "2023-10-20", title: "Mobile App Launch", description: "Native mobile applications for iOS and Android" },
    { version: "v1.5.0", date: "2023-08-15", title: "Analytics Dashboard", description: "Advanced reporting and data visualization tools" }
  ];

  const stats = [
    { icon: <GitBranch className="w-8 h-8" />, label: "Branches", value: "24" },
    { icon: <GitCommit className="w-8 h-8" />, label: "Commits", value: "1,247" },
    { icon: <GitPullRequest className="w-8 h-8" />, label: "Pull Requests", value: "89" },
    { icon: <Star className="w-8 h-8" />, label: "Stars", value: "2.1k" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Hero Section */}
      <div className="pt-32 pb-16 bg-gradient-to-r from-[#3a563f] to-green-700">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center">
              <GitBranch className="w-12 h-12 text-[#3a563f]" />
            </div>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Git Force
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            The open-source initiative behind Ecobin's waste management platform. 
            Join our community of developers and environmentalists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="https://github.com/ecobin/gitforce"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#3a563f] font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              <GitBranch className="w-5 h-5 mr-2" />
              View on GitHub
            </a>
            <a 
              href="#documentation"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#3a563f] transition-all duration-300"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Read Documentation
            </a>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#3a563f] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-[#3a563f] text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-green-50 hover:text-[#3a563f]"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
            {activeTab === "overview" && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Project Overview</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Git Force is the open-source foundation of Ecobin, providing the core infrastructure, 
                    AI models, and APIs that power our waste management platform.
                  </p>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">What We're Building</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#3a563f] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">AI-powered waste classification models</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#3a563f] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">RESTful APIs for waste management</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#3a563f] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">Mobile app SDKs and components</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#3a563f] rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">Analytics and reporting tools</span>
                      </li>
                    </ul>
                  </div>
                  <div className="relative">
                    <div className="w-full h-96 bg-gradient-to-br from-[#3a563f] to-green-600 rounded-2xl shadow-2xl">
                      <div className="absolute inset-0 bg-black bg-opacity-20 rounded-2xl"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Code className="w-24 h-24 text-white opacity-80" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Involved</h3>
                  <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
                    Whether you're a developer, designer, or environmental enthusiast, 
                    there are many ways to contribute to our mission.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="https://github.com/ecobin/gitforce/issues"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-[#3a563f] text-white font-semibold rounded-lg hover:bg-green-700 transition-all duration-300"
                    >
                      Report Issues
                    </a>
                    <a 
                      href="https://github.com/ecobin/gitforce/pulls"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#3a563f] text-[#3a563f] font-semibold rounded-lg hover:bg-[#3a563f] hover:text-white transition-all duration-300"
                    >
                      Submit PRs
                    </a>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "contributors" && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Top Contributors</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contributors.map((contributor, index) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center gap-4 mb-4">
                        <img 
                          src={contributor.avatar} 
                          alt={contributor.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-900">{contributor.name}</h3>
                          <p className="text-sm text-[#3a563f]">{contributor.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">{contributor.commits} commits</span>
                        <TrendingUp className="w-5 h-5 text-[#3a563f]" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "releases" && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Recent Releases</h2>
                <div className="space-y-6">
                  {releases.map((release, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-[#3a563f] text-white rounded-full text-sm font-semibold">
                            {release.version}
                          </span>
                          <span className="text-gray-500">{release.date}</span>
                        </div>
                        <Download className="w-5 h-5 text-[#3a563f]" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{release.title}</h3>
                      <p className="text-gray-600">{release.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "documentation" && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Documentation</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">Getting Started</h3>
                    <div className="space-y-4">
                      <a href="#" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300">
                        <BookOpen className="w-5 h-5 text-[#3a563f]" />
                        <span>Installation Guide</span>
                        <ArrowRight className="w-4 h-4 ml-auto" />
                      </a>
                      <a href="#" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300">
                        <Code className="w-5 h-5 text-[#3a563f]" />
                        <span>API Reference</span>
                        <ArrowRight className="w-4 h-4 ml-auto" />
                      </a>
                      <a href="#" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300">
                        <Users className="w-5 h-5 text-[#3a563f]" />
                        <span>Contributing Guidelines</span>
                        <ArrowRight className="w-4 h-4 ml-auto" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-gray-900">Community</h3>
                    <div className="space-y-4">
                      <a href="#" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300">
                        <MessageCircle className="w-5 h-5 text-[#3a563f]" />
                        <span>Discord Server</span>
                        <ArrowRight className="w-4 h-4 ml-auto" />
                      </a>
                      <a href="#" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300">
                        <GitBranch className="w-5 h-5 text-[#3a563f]" />
                        <span>GitHub Discussions</span>
                        <ArrowRight className="w-4 h-4 ml-auto" />
                      </a>
                      <a href="#" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300">
                        <BookOpen className="w-5 h-5 text-[#3a563f]" />
                        <span>Wiki</span>
                        <ArrowRight className="w-4 h-4 ml-auto" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitForce;
