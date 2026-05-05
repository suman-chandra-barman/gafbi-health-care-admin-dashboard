/** @format */

import { AuthLayout, VerifyOTPForm } from "@/components/AuthComponents";

export default function VerifyOtpPage() {
  return (
    <AuthLayout
      title="Verify Your Identity"
      subtitle="Enter the 6-digit code sent to your email"
    >
      <VerifyOTPForm />
    </AuthLayout>
  );
}
