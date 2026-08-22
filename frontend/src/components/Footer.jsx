import React from "react";
import AppLogo from "./ui/AppLogo.jsx";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#07090e] py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <AppLogo text="Dayflow HRMS" iconName="SparklesIcon" size={28} className="text-white" />
        </div>
        <div className="text-xs text-neutral-400">
          © {new Date().getFullYear()} Dayflow HRMS. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
