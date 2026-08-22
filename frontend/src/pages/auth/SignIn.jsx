import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../../context/AuthContext.jsx";
import { AuthUI, Label, Input, PasswordInput, Button } from "@/components/ui/auth-ui";
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
    <AuthUI isSignIn={true}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="on" className="flex flex-col gap-5" id="signin-form">
        {/* Centered Heading */}
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-xl font-bold tracking-tight text-neutral-900">Sign in to Dayflow</h1>
          <p className="text-xs text-gray-500">Enter your credentials below to access your workspace</p>
        </div>

        {/* Inputs */}
        <div className="grid gap-3.5">
          <div className="grid gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              {...register("email")}
              placeholder="name@company.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-600 text-xs mt-0.5">{errors.email.message}</p>
            )}
          </div>

          <PasswordInput
            id="password"
            label="Password"
            {...register("password")}
            placeholder="Password"
            autoComplete="current-password"
            error={errors.password?.message}
          />

          <Button type="submit" variant="default" className="mt-1 w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium shadow-xs" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </div>

        {/* Switch Link */}
        <div className="text-center text-xs text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-neutral-900 hover:underline font-semibold">
            Sign up
          </Link>
        </div>

        {/* Fast-Fill Demo Credentials */}
        <div className="pt-3 border-t border-gray-100">
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider text-center mb-2">
            Quick Fill Demo Accounts:
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill("admin")}
              className="flex-1 py-1.5 px-2 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 text-xs font-medium text-neutral-700 transition-colors shadow-2xs"
            >
              Admin Demo
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill("employee")}
              className="flex-1 py-1.5 px-2 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 text-xs font-medium text-neutral-700 transition-colors shadow-2xs"
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
