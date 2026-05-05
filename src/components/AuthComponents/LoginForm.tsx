/** @format */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import RoleSelector from "./RoleSelector";
import { useUserRole } from "@/contexts/UserRoleContext";
import { Eye, EyeOff } from "lucide-react";

const LoginForm = () => {
  const router = useRouter();
  const { setRole } = useUserRole();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user" as "user" | "admin",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(formData.role);
    console.log("Login:", formData);

    if (formData.role === "user") {
      // Redirect user to gafbi-health-care dashboard
      // Update the URL based on your deployment environment
      const gafbiHealthCareUrl =
        process.env.NEXT_PUBLIC_GAFBI_HEALTH_CARE_URL ||
        "http://localhost:3000";
      window.location.href = `${gafbiHealthCareUrl}/dashboard/overview`;
    } else {
      // Redirect admin to admin dashboard
      router.push("/admin/users");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-sm font-medium text-primary">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-sm font-medium text-primary">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
            className="h-11 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-tertiary hover:text-primary transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <RoleSelector
        value={formData.role}
        onChange={(role) => setFormData({ ...formData, role })}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="remember"
            checked={formData.rememberMe}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, rememberMe: checked as boolean })
            }
          />
          <label
            htmlFor="remember"
            className="text-sm text-tertiary cursor-pointer"
          >
            Remember me
          </label>
        </div>
        <Link
          href="/reset-pass"
          className="text-sm text-primary hover:underline font-medium"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full h-11 rounded-lg">
        Sign In
      </Button>

      <p className="text-center text-sm text-tertiary">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="text-primary hover:underline font-medium"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
