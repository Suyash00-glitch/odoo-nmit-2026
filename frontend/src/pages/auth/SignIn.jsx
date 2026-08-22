import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../context/AuthContext.jsx";
import { AuthUI, CustomPillInput } from "@/components/ui/auth-ui";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const schema = z.object({
  email: z.string().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email.trim(), data.password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      if (err?.response?.data?.error?.code === "EMAIL_NOT_VERIFIED") {
        navigate("/verify-email", { state: { email: data.email.trim() } });
      }
      const msg =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        "Invalid credentials. Please check your email/password.";
      toast.error(msg);
    }
  };

  return (
    <AuthUI
      isSignIn={true}
      title="Sign In to Dayflow"
      subtitle="Welcome back! Enter your credentials to access your portal."
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="on" className="space-y-4" id="signin-form">
        
        {/* Email Pill Input */}
        <CustomPillInput
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Password Pill Input */}
        <CustomPillInput
          label="Password"
          type="password"
          placeholder="••••••••••••"
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
        />

        {/* Lime Pill Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-full bg-[#D4FF00] hover:bg-[#C3EE00] text-black font-black text-sm shadow-lime transition-all active:scale-98 flex items-center justify-center gap-2 mt-4"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <span>Sign In</span>
          )}
        </button>

      </form>
    </AuthUI>
  );
};

export default SignIn;
