import React from "react";
import AuthPage from "@/components/auth/AuthPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | Dayflow HRMS",
  description: "Sign in to Dayflow HRMS with your system-generated Login ID or corporate email",
};

export default function LoginRoute() {
  return <AuthPage initialMode="signin" />;
}
