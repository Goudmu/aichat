import LandingContent from "@/components/own/landing/landing-content";
import LandingHero from "@/components/own/landing/landing-hero";
import LandingNavbar from "@/components/own/landing/landing-navbar";
import React from "react";

const LandingPage = () => {
  return (
    <div className=" h-full">
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
};

export default LandingPage;
