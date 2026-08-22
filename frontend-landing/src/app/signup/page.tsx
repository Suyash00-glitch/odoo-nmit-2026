import React from "react";
import AuthPage from "@/components/auth/AuthPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Dayflow HRMS",
  description: "Register your organization and auto-generate your HR Login ID",
};

export default function SignUpRoute() {
  return <AuthPage initialMode="signup" />;
}
