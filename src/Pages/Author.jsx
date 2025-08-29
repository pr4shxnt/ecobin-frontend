import React from "react";
import { Github, Linkedin, Twitter, Mail, Code, BookOpen, Award, Users } from "lucide-react";

const Author = () => {
  const teamMembers = [
    {
      name: "Prashant Adhikari",
      role: "Lead Developer",
      image: "https://avatars.githubusercontent.com/u/130303397?v=4",
      bio: "Full-stack developer with 1+ years of experience in building scalable web applications. Passionate about clean code and user experience.",
      skills: ["React", "Node.js", "Python", "AWS"],
      github: "https://github.com/pr4shxnt",
      linkedin: "https://linkedin.com/in/alexjohnson",
      twitter: "https://twitter.com/pr4xnt"
    },
    
    {
      name: "Success Lagun",
      role: "UI/UX Designer",
      image: "https://media.licdn.com/dms/image/v2/D4D03AQH-UMNPHyqpCg/profile-displayphoto-crop_800_800/B4DZiZrdUeHsAM-/0/1754924964488?e=1759363200&v=beta&t=90QdeZg8HUQshFpr-vtvUw62-hx9Mt_o1c9ZfBvjLGw",
      bio: "Creative designer with a passion for sustainable design. Specializes in creating intuitive interfaces that promote environmental awareness.",
      skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
      github: "https://github.com/",
      linkedin: "https://linkedin.com/in/",
      twitter: "https://twitter.com/"
    }
  ];

  const achievements = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Best Innovation Award",
      description: "Recognized for outstanding contribution to environmental technology at GreenTech 2024"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "10,000+ Users",
      description: "Successfully onboarded over 10,000 active users across multiple cities"
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Open Source",
      description: "Contributed to 50+ open source projects in the sustainability space"
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Research Papers",
      description: "Published 15+ research papers on AI-powered waste management"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Hero Section */}
      <div className="pt-32 pb-16 bg-gradient-to-r from-[#3a563f] to-green-700">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Meet Our Team
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            The passionate developers, designers, and engineers behind Ecobin's 
            innovative waste management solutions.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're a diverse team united by our mission to make waste management 
              smarter and more sustainable through technology.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-[#3a563f]"
                    />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-[#3a563f] font-semibold mb-4">{member.role}</p>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{member.bio}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, skillIndex) => (
                        <span 
                          key={skillIndex}
                          className="px-3 py-1 bg-green-100 text-[#3a563f] rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-center gap-4">
                    <a 
                      href={member.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-[#3a563f] hover:text-white transition-all duration-300"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-[#3a563f] hover:text-white transition-all duration-300"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a 
                      href={member.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-[#3a563f] hover:text-white transition-all duration-300"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Milestones that showcase our commitment to innovation and environmental impact.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-[#3a563f] rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-white">
                    {achievement.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Us Section */}
      <div className="py-20 bg-gradient-to-r from-[#3a563f] to-green-700">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Join Our Team
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals who want to make a difference 
            in environmental technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:careers@ecobin.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#3a563f] font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              <Mail className="w-5 h-5 mr-2" />
              View Open Positions
            </a>
            <a 
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-[#3a563f] transition-all duration-300"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Author;
