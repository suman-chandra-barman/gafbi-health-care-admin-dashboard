/** @format */
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useForgotPasswordMutation,
  useVerifyForgotPasswordOtpMutation,
} from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/features/auth/authSlice";

const VerifyOTPForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [verifyOtp, { isLoading }] = useVerifyForgotPasswordOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useForgotPasswordMutation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail") || "";
    if (!storedEmail) {
      router.push("/reset-pass");
      return;
    }
    setEmail(storedEmail);
  }, [router]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join("");
    setErrorMessage(null);

    try {
      const payload = await verifyOtp({
        email_address: email,
        otp_code: otpCode,
      }).unwrap();

      if (payload?.success) {
        if (payload.data?.tokens) {
          dispatch(
            setCredentials({
              user: payload.data.user,
              tokens: payload.data.tokens,
            }),
          );
        }
        router.push("/create-new-pass");
      } else {
        setErrorMessage(payload?.message || "Verification failed.");
      }
    } catch {
      setErrorMessage("Verification failed. Please try again.");
    }
  };

  const handleResend = async () => {
    if (!email) return;
    setErrorMessage(null);

    try {
      const payload = await resendOtp({ email_address: email }).unwrap();
      if (!payload?.success) {
        setErrorMessage(payload?.message || "Resend failed.");
      }
    } catch {
      setErrorMessage("Resend failed. Please try again.");
    }
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

      {errorMessage && (
        <p className="text-sm text-red-500 text-center" role="alert">
          {errorMessage}
        </p>
      )}

      <Button
        type="submit"
        className="w-full h-11 rounded-lg"
        disabled={isLoading}
      >
        {isLoading ? "Verifying..." : "Verify Code"}
      </Button>

      <p className="text-center text-sm text-tertiary">
        Didn't receive the code?{" "}
        <button
          type="button"
          onClick={handleResend}
          disabled={isResending}
          className="text-primary hover:underline font-medium"
        >
          {isResending ? "Resending..." : "Resend"}
        </button>
      </p>
    </form>
  );
};

export default VerifyOTPForm;
