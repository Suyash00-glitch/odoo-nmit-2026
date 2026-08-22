import React from "react";
import Header from "../../components/Header";
import HeroSection from "../../components/landing/HeroSection";
import ProblemArc from "../../components/landing/ProblemArc";
import BeforeAfterSection from "../../components/landing/BeforeAfterSection";
import SocialProofSection from "../../components/landing/SocialProofSection";
import LeadGenSection from "../../components/landing/LeadGenSection";
import Footer from "../../components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#07090e] text-white">
      <Header />
      <HeroSection />
      <ProblemArc />
      <BeforeAfterSection />
      <SocialProofSection />
      <LeadGenSection />
      <Footer />
    </div>
  );
}
