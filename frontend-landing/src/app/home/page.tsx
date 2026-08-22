import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "./components/HeroSection";
import StickyCTABar from "./components/StickyCTABar";
import ProblemArc from "./components/ProblemArc";
import BeforeAfterSection from "./components/BeforeAfterSection";
import SocialProofSection from "./components/SocialProofSection";
import LeadGenSection from "./components/LeadGenSection";
import MarqueeBar from "./components/MarqueeBar";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-ledger-black overflow-x-hidden">
      {/* Grain texture overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      <Header />
      <StickyCTABar />
      <HeroSection />
      <MarqueeBar />
      <ProblemArc />
      <BeforeAfterSection />
      <SocialProofSection />
      <LeadGenSection />
      <Footer />
    </main>
  );
}
