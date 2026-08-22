import React from "react";
import AppLogo from "@/components/ui/AppLogo";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-ledger-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Logo + Links */}
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <AppLogo
              text="Ledger"
              iconName="BookOpenIcon"
              size={28}
              className="text-ledger-white"
            />
            <nav
              className="flex items-center gap-6"
              aria-label="Footer navigation"
            >
              {[
                { label: "The Problem", href: "#problem" },
                { label: "How It Works", href: "#solution" },
                { label: "Results", href: "#proof" },
                { label: "Free Audit", href: "#audit" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-ledger-white/40 hover:text-ledger-white transition-colors duration-200 focus:outline-none focus:text-sky"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Right: Social + Legal */}
          <div className="flex items-center gap-5">
            {/* Social Icons */}
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-ledger-white/30 hover:text-sky transition-colors"
            >
              <svg
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-ledger-white/30 hover:text-sky transition-colors"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>
            <span className="text-ledger-white/20 text-sm">© 2026 Ledger</span>
            <a
              href="#"
              className="text-sm text-ledger-white/30 hover:text-ledger-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm text-ledger-white/30 hover:text-ledger-white transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
