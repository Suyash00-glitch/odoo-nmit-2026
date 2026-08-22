import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authApi } from "../../api/auth.api.js";
import { generateLoginId, calculatePasswordStrength } from "../../utils/idGenerator.js";
import { AuthUI, Label, Input, PasswordInput, Button } from "@/components/ui/auth-ui";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, "Full name is required"),
  email: z.string().email("Valid email required"),
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

  // Compute dynamic Login ID in real time based on name
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
    <AuthUI isSignIn={false}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="on" className="flex flex-col gap-5" id="signup-form">
        {/* Centered Heading */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-xl font-bold tracking-tight text-neutral-900">Create your account</h1>
          <p className="text-xs text-gray-500">Enter your details below to register your profile</p>
        </div>

        {/* Inputs */}
        <div className="grid gap-3.5">
          <div className="grid gap-1.5">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              {...register("name")}
              placeholder="John Doe"
              autoComplete="name"
            />
            {errors.name && (
              <p className="text-red-600 text-xs mt-0.5">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="name@company.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-0.5">{errors.email.message}</p>
            )}
          </div>

          {/* Dynamic Generated Login ID pill */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs">
            <span className="text-gray-500">Assigned System ID:</span>
            <span className="font-mono font-bold text-neutral-900">{idBreakdown.fullId}</span>
          </div>

          <div className="grid gap-1.5">
            <PasswordInput
              id="password"
              label="Password"
              {...register("password")}
              placeholder="Password"
              autoComplete="new-password"
              error={errors.password?.message}
            />
            {password && (
              <div className="mt-1 flex items-center gap-2">
                <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${pwdStrength.color} transition-all duration-300`}
                    style={{ width: `${pwdStrength.score}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-500 font-mono">{pwdStrength.label}</span>
              </div>
            )}
          </div>

          <div className="grid gap-1.5">
            <Label>Role</Label>
            <select
              {...register("role")}
              className="flex h-10 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs text-neutral-900 focus-visible:border-neutral-900 focus-visible:outline-none shadow-2xs"
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">HR Admin</option>
            </select>
          </div>

          <Button type="submit" variant="default" className="mt-1 w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium shadow-xs" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Creating account...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </div>

        {/* Switch Link */}
        <div className="text-center text-xs text-gray-500">
          Already have an account?{" "}
          <Link to="/signin" className="text-neutral-900 hover:underline font-semibold">
            Sign in
          </Link>
        </div>
      </form>
    </AuthUI>
  );
};

export default SignUp;
