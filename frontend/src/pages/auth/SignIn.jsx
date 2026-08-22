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
    setValue,
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
      await login(data.email, data.password);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err) {
      const msg =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        "Invalid credentials. Please check your email/password.";
      toast.error(msg);
    }
  };

  const handleDemoFill = (role) => {
    if (role === "admin") {
      setValue("email", "admin@dayflow.dev");
      setValue("password", "password123");
    } else {
      setValue("email", "alice.johnson@dayflow.dev");
      setValue("password", "password123");
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
          className="w-full py-4 rounded-full bg-[#D4FF00] hover:bg-[#C3EE00] text-black font-black text-sm shadow-lime transition-all active:scale-98 flex items-center justify-center gap-2 mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing in...</span>
            </>
          ) : (
            <span>Submit</span>
          )}
        </button>

        {/* Social Apple & Google Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            className="py-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2 text-xs font-bold text-neutral-900 shadow-2xs transition-colors"
          >
            <span className="text-sm"></span>
            <span>Apple</span>
          </button>
          <button
            type="button"
            className="py-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-2 text-xs font-bold text-neutral-900 shadow-2xs transition-colors"
          >
            <span className="text-xs font-black text-blue-600">G</span>
            <span>Google</span>
          </button>
        </div>

        {/* Fast-Fill Demo Credentials Pill */}
        <div className="pt-2 border-t border-gray-200/70">
          <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider text-center mb-2">
            Quick Fill Demo Accounts:
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill("admin")}
              className="flex-1 py-2 px-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-xs font-bold text-neutral-800 shadow-2xs transition-colors"
            >
              Admin Demo
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill("employee")}
              className="flex-1 py-2 px-3 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-xs font-bold text-neutral-800 shadow-2xs transition-colors"
            >
              Employee Demo
            </button>
          </div>
        </div>

      </form>
    </AuthUI>
  );
};

export default SignIn;
