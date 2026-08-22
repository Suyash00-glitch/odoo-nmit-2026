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
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="on" className="flex flex-col gap-6" id="signin-form">
        {/* Centered Heading */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">Sign in to your account</h1>
          <p className="text-sm text-neutral-400">Enter your email below to sign in</p>
        </div>

        {/* Inputs */}
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              {...register("email")}
              placeholder="m@example.com"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-0.5">{errors.email.message}</p>
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

          <Button type="submit" variant="outline" className="mt-2 w-full py-2.5 bg-neutral-900 border-neutral-800 hover:bg-neutral-800 text-white font-medium" disabled={isSubmitting}>
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
        <div className="text-center text-sm text-neutral-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-white hover:underline font-medium">
            Sign up
          </Link>
        </div>

        {/* Fast-Fill Demo Credentials */}
        <div className="mt-2 pt-4 border-t border-neutral-900">
          <p className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider text-center mb-2">
            Quick Fill Demo Accounts:
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleDemoFill("admin")}
              className="flex-1 py-1.5 px-2 rounded-md bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-300 hover:text-white transition-colors"
            >
              Admin Demo
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill("employee")}
              className="flex-1 py-1.5 px-2 rounded-md bg-neutral-950 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-300 hover:text-white transition-colors"
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
