import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authApi } from "../../api/auth.api.js";
import { calculatePasswordStrength } from "../../utils/idGenerator.js";
import { AuthUI, CustomPillInput } from "@/components/ui/auth-ui";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const password = watch("password") || "";

  const pwdStrength = useMemo(() => {
    return calculatePasswordStrength(password);
  }, [password]);

  const onSubmit = async (data) => {
    try {
      const parts = data.name.trim().split(/\s+/);
      const firstName = parts[0] || "User";
      const lastName = parts.length > 1 ? parts.slice(1).join(" ") : "";

      await authApi.signup({
        name: data.name.trim(),
        firstName,
        lastName,
        email: data.email.trim(),
        password: data.password,
      });
      toast.success("Account created. Check your inbox to verify your email.");
      navigate("/verify-email", { state: { email: data.email.trim() } });
    } catch (err) {
      const msg =
        err?.response?.data?.error?.message ||
        err?.response?.data?.message ||
        "Failed to create account. Please check your details.";
      toast.error(msg);
    }
  };

  return (
    <AuthUI
      isSignIn={false}
      title="Create New Account"
      subtitle="Sign up for your Dayflow workforce account"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="on" className="space-y-3.5" id="signup-form">
        
        {/* Full Name Pill Input */}
        <CustomPillInput
          label="Full Name"
          type="text"
          placeholder="Jane Doe"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />

        {/* Email Pill Input */}
        <CustomPillInput
          label="Email"
          type="email"
          placeholder="name@company.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        {/* Password Pill Input */}
        <div>
          <CustomPillInput
            label="Password"
            type="password"
            placeholder="••••••••••••"
            autoComplete="new-password"
            error={errors.password?.message}
            {...register("password")}
          />
          {password && (
            <div className="mt-1.5 px-3 flex items-center gap-2">
              <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${pwdStrength.color} transition-all duration-300`}
                  style={{ width: `${pwdStrength.score}%` }}
                />
              </div>
              <span className="text-[10px] text-gray-500 font-mono font-bold">{pwdStrength.label}</span>
            </div>
          )}
        </div>

        {/* Lime Pill Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-full bg-[#D4FF00] hover:bg-[#C3EE00] text-black font-black text-sm shadow-lime transition-all active:scale-98 flex items-center justify-center gap-2 mt-4"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating account...</span>
            </>
          ) : (
            <span>Create Account</span>
          )}
        </button>

      </form>
    </AuthUI>
  );
};

export default SignUp;
