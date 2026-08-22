import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  Menu,
  X,
  Users,
  Clock,
  Calendar,
  CreditCard,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu-1.jsx";
import ThemeToggle from "./common/ThemeToggle.jsx";

const moduleFeatures = [
  {
    title: "1-Click Attendance",
    description: "Real-time check-in, automatic duration tracking, and live floor presence.",
    icon: Clock,
    href: "#workflow",
    color: "text-emerald-500 bg-emerald-500/10",
  },
  {
    title: "Leave Governance",
    description: "Paid, Sick, and Unpaid leave workflows with instant reviewer notes.",
    icon: Calendar,
    href: "#workflow",
    color: "text-indigo-500 bg-indigo-500/10",
  },
  {
    title: "Payroll & Deductions",
    description: "Transparent salary structures (Base, HRA allowances, PF & tax deductions).",
    icon: CreditCard,
    href: "#analytics",
    color: "text-purple-500 bg-purple-500/10",
  },
  {
    title: "Executive Analytics",
    description: "Real-time charts powered by Recharts for headcount and attendance trends.",
    icon: BarChart3,
    href: "#analytics",
    color: "text-amber-500 bg-amber-500/10",
  },
];

const workflowSteps = [
  {
    title: "Dynamic Login ID Provisioning",
    description: "Zero-collision deterministic format (e.g. OIJODO20260001) computed live.",
    href: "/signup",
  },
  {
    title: "Role-Based Protected Access",
    description: "Strict isolation between Employee self-service and HR Admin operations.",
    href: "#workflow",
  },
  {
    title: "PostgreSQL Database Sync",
    description: "Neon cloud database with Prisma ORM and JWT session refresh.",
    href: "#proof",
  },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2.5 bg-white/85 dark:bg-black/85 backdrop-blur-xl border-b border-slate-200 dark:border-neutral-900 shadow-sm"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-purple-400 p-[1px] shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/35 transition-all duration-300">
            <div className="w-full h-full bg-[#0d111d] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Dayflow <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400">HRMS</span>
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 text-[9px] font-semibold tracking-wider uppercase rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-300 border border-purple-500/25">
                v2.4
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Interactive Navigation Menu */}
        <div className="hidden lg:flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              
              {/* Dropdown 1: Modules & Features */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-xs font-medium">
                  Modules
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[550px] grid-cols-2 gap-3 p-4">
                    {moduleFeatures.map((feat) => {
                      const Icon = feat.icon;
                      return (
                        <a
                          key={feat.title}
                          href={feat.href}
                          className="group/item flex items-start gap-3 p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-neutral-900 transition-colors"
                        >
                          <div className={`p-2 rounded-lg shrink-0 ${feat.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover/item:text-purple-600 dark:group-hover/item:text-purple-400 transition-colors flex items-center gap-1">
                              <span>{feat.title}</span>
                              <ChevronRight className="w-3 h-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                            </div>
                            <p className="text-[11px] text-slate-500 dark:text-neutral-400 line-clamp-2 mt-0.5">
                              {feat.description}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Dropdown 2: Workflows & Architecture */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-xs font-medium">
                  Workflows
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[460px] gap-2 p-4">
                    <div className="mb-2 pb-2 border-b border-slate-100 dark:border-neutral-900">
                      <p className="text-xs font-bold text-slate-900 dark:text-white">Core System Workflows</p>
                      <p className="text-[11px] text-slate-500 dark:text-neutral-400">Automated employee lifecycle management</p>
                    </div>
                    {workflowSteps.map((step) => (
                      <a
                        key={step.title}
                        href={step.href}
                        className="group/step p-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-900 transition-colors"
                      >
                        <p className="text-xs font-semibold text-slate-800 dark:text-neutral-200 group-hover/step:text-purple-600 dark:group-hover/step:text-purple-400">
                          {step.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-neutral-400">
                          {step.description}
                        </p>
                      </a>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Link 3: The Transformation */}
              <NavigationMenuItem>
                <a
                  href="#transformation"
                  className={navigationMenuTriggerStyle()}
                >
                  Transformation
                </a>
              </NavigationMenuItem>

              {/* Link 4: Reviews */}
              <NavigationMenuItem>
                <a
                  href="#proof"
                  className={navigationMenuTriggerStyle()}
                >
                  Reviews
                </a>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Actions: Theme Toggle + Auth Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle size="sm" />

          <Link
            to="/signin"
            className="text-xs font-semibold text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-all"
          >
            Sign In
          </Link>

          <Link
            to="/signup"
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-lg shadow-md shadow-purple-600/20 transition-all flex items-center gap-1.5"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Toggle & Theme */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle size="sm" />
          <button
            className="text-slate-700 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white p-1.5 rounded-lg bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mx-4 mt-3 bg-white dark:bg-neutral-950 border border-slate-200 dark:border-neutral-800 rounded-2xl p-4 flex flex-col gap-3 shadow-2xl animate-fade-in">
          <div className="space-y-1 border-b border-slate-100 dark:border-neutral-900 pb-3">
            <p className="text-[11px] font-semibold uppercase text-slate-400 dark:text-neutral-500 px-2">Navigation</p>
            <a
              href="#workflow"
              className="block px-2 py-1.5 text-xs font-medium text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Workforce Modules & Attendance
            </a>
            <a
              href="#transformation"
              className="block px-2 py-1.5 text-xs font-medium text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              The Transformation
            </a>
            <a
              href="#analytics"
              className="block px-2 py-1.5 text-xs font-medium text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Payroll & Analytics
            </a>
            <a
              href="#proof"
              className="block px-2 py-1.5 text-xs font-medium text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-neutral-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Customer Reviews
            </a>
          </div>

          <div className="flex flex-col gap-2 pt-1">
            <Link
              to="/signin"
              className="text-center py-2 text-xs font-semibold text-slate-700 dark:text-neutral-300 rounded-xl bg-slate-100 dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign In to Portal
            </Link>
            <Link
              to="/signup"
              className="text-center py-2 text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Register Workspace
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
