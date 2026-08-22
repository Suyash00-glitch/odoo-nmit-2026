import React from "react";
import Header from "../../components/Header.jsx";
import HeroSection from "../../components/landing/HeroSection.jsx";
import MarqueeBar from "../../components/landing/MarqueeBar.jsx";
import ProductivitySection from "../../components/landing/ProductivitySection.jsx";
import InnovationBentoSection from "../../components/landing/InnovationBentoSection.jsx";
import HowItWorksSection from "../../components/landing/HowItWorksSection.jsx";
import IntegrationsSection from "../../components/landing/IntegrationsSection.jsx";
import TestimonialsSection from "../../components/landing/TestimonialsSection.jsx";
import CTABannerSection from "../../components/landing/CTABannerSection.jsx";
import Footer from "../../components/Footer.jsx";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans selection:bg-[#D4FF00] selection:text-black">
      <Header />
      <HeroSection />
      <MarqueeBar />
      <ProductivitySection />
      <InnovationBentoSection />
      <HowItWorksSection />
      <IntegrationsSection />
      <TestimonialsSection />
      <CTABannerSection />
      <Footer />
    </div>
  );
}
