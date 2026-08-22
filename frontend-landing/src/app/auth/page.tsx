import React from "react";
import AuthPage from "@/components/auth/AuthPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Dayflow HRMS",
  description: "Sign in or register your organization with Dayflow HRMS",
};

export default function AuthRoute() {
  return <AuthPage initialMode="signin" />;
}
