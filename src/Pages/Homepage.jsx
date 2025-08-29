import React from "react";
import HeroComp from "../Components/HeroComp";
import VideoComp from "../Components/VideoComp";
import StatsComp from "../Components/StatsComp";
import TestimonialsComp from "../Components/TestimonialsComp";
import CTASection from "../Components/CTASection";

const Homepage = () => {
  return (
    <>
      <HeroComp />
      <VideoComp />
      <StatsComp />
      
      <TestimonialsComp />
      <CTASection />
    </>
  );
};

export default Homepage;
