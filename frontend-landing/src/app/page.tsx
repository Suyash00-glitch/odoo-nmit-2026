import React from "react";
import AuthPage from "@/components/auth/AuthPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dayflow HRMS — Intelligent Workforce Management",
  description: "Enterprise Human Resource Management System with automated Login ID generation and attendance tracking.",
};

export default function RootPage() {
  return <AuthPage initialMode="signin" />;
}
