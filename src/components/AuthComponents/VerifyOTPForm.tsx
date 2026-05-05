/** @format */
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const VerifyOTPForm = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    console.log("OTP:", otpCode);
    router.push("/create-new-pass");
  };

  const handleResend = () => {
    console.log("Resending OTP");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <p className="text-sm text-tertiary text-center">
          We've sent a 6-digit code to your email. Please enter it below to
          verify your identity.
        </p>

        <div className="flex gap-2 justify-center">
          {otp.map((digit, index) => (
            <Input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg font-semibold"
              required
            />
          ))}
        </div>
      </div>

      <Button type="submit" className="w-full h-11 rounded-lg">
        Verify Code
      </Button>

      <p className="text-center text-sm text-tertiary">
        Didn't receive the code?{" "}
        <button
          type="button"
          onClick={handleResend}
          className="text-primary hover:underline font-medium"
        >
          Resend
        </button>
      </p>
    </form>
  );
};

export default VerifyOTPForm;
