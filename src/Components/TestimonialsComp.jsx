import React, { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialsComp = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Environmental Officer",
      company: "Green City Council",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "Ecobin has revolutionized how we handle waste management in our city. The AI accuracy is incredible, and our recycling rates have increased by 40% since implementation.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Property Manager",
      company: "EcoLiving Apartments",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "The mobile app makes it so easy for our tenants to participate in recycling. We've seen a significant improvement in waste sorting compliance.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Sustainability Director",
      company: "TechCorp Inc.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "Implementing Ecobin across our corporate campuses has been seamless. The analytics help us track our environmental impact and set meaningful goals.",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Restaurant Owner",
      company: "Green Bites Cafe",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: "As a small business owner, I was worried about the complexity, but Ecobin made waste management simple and cost-effective for us.",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, i) => (
      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied users who have transformed their waste management with Ecobin.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#3a563f] hover:bg-[#3a563f] hover:text-white transition-all duration-300"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-[#3a563f] hover:bg-[#3a563f] hover:text-white transition-all duration-300"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Testimonial Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 relative">
            <div className="absolute top-8 right-8 text-[#3a563f] opacity-20">
              <Quote className="w-16 h-16" />
            </div>

            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>
              <p className="text-xl text-gray-700 leading-relaxed italic">
                "{testimonials[currentTestimonial].content}"
              </p>
            </div>

            <div className="flex items-center justify-center gap-4">
              <img
                src={testimonials[currentTestimonial].avatar}
                alt={testimonials[currentTestimonial].name}
                className="w-16 h-16 rounded-full object-cover border-4 border-[#3a563f]"
              />
              <div className="text-center">
                <h3 className="font-semibold text-gray-900 text-lg">
                  {testimonials[currentTestimonial].name}
                </h3>
                <p className="text-[#3a563f] font-medium">
                  {testimonials[currentTestimonial].role}
                </p>
                <p className="text-gray-600 text-sm">
                  {testimonials[currentTestimonial].company}
                </p>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-[#3a563f] w-8"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-6">Trusted by leading organizations worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">Green City Council</div>
            <div className="text-2xl font-bold text-gray-400">EcoLiving</div>
            <div className="text-2xl font-bold text-gray-400">TechCorp</div>
            <div className="text-2xl font-bold text-gray-400">Green Bites</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsComp;
