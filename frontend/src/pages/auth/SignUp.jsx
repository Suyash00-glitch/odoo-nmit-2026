import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authApi } from "../../api/auth.api.js";
import { generateLoginId, calculatePasswordStrength } from "../../utils/idGenerator.js";
import { AuthUI, CustomPillInput } from "@/components/ui/auth-ui";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["EMPLOYEE", "ADMIN"]).default("EMPLOYEE"),
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
      role: "EMPLOYEE",
    },
  });

  const fullName = watch("name") || "";
  const password = watch("password") || "";

  // Dynamic Login ID generation
  const idBreakdown = useMemo(() => {
    return generateLoginId("Dayflow Corp", fullName || "John Doe", 2026, 1);
  }, [fullName]);

  const pwdStrength = useMemo(() => {
    return calculatePasswordStrength(password);
  }, [password]);

  const onSubmit = async (data) => {
    try {
      const parts = data.name.trim().split(/\s+/);
      const firstName = parts[0] || "User";
      const lastName = parts.length > 1 ? parts.slice(1).join(" ") : "Member";

      await authApi.signup({
        firstName,
        lastName,
        email: data.email,
        employeeId: idBreakdown.fullId,
        password: data.password,
        role: data.role,
      });
      toast.success("Account created! Please sign in.");
      navigate("/signin");
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
      subtitle="Sign up and get a 30-day free trial"
    >
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="on" className="space-y-3.5" id="signup-form">
        
        {/* Full Name Pill Input */}
        <CustomPillInput
          label="Full Name"
          type="text"
          placeholder="Habibur Rahman"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />

        {/* Email Pill Input */}
        <CustomPillInput
          label="Email"
          type="email"
          placeholder="mdhabiburrhoman111@gmail.com"
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

        {/* Dynamic Assigned System ID Badge */}
        <div className="flex items-center justify-between px-4 py-2 rounded-full bg-white/80 border border-gray-200/80 text-xs shadow-2xs">
          <span className="text-gray-500 font-medium">Assigned Login ID:</span>
          <span className="font-mono font-black text-neutral-950">{idBreakdown.fullId}</span>
        </div>

        {/* Lime Pill Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-full bg-[#D4FF00] hover:bg-[#C3EE00] text-black font-black text-sm shadow-lime transition-all active:scale-98 flex items-center justify-center gap-2 mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Creating account...</span>
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

      </form>
    </AuthUI>
  );
};

export default SignUp;
