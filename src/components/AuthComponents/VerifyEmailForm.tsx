/** @format */
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const VerifyEmailForm = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/sign-in");
  };

  const handleResend = () => {
    console.log("Resending verification email");
  };

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-primary" />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-tertiary text-sm">
          We've sent a verification link to your email address. Please check
          your inbox and click the link to verify your account.
        </p>
      </div>

      <div className="space-y-3">
        <Button
          type="button"
          onClick={handleContinue}
          className="w-full h-11 rounded-lg"
        >
          Continue to Sign In
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={handleResend}
          className="w-full h-11 rounded-lg"
        >
          Resend Verification Email
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmailForm;
