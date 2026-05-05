/** @format */

import { AuthLayout, ResetPasswordForm } from "@/components/AuthComponents";

export default function ResetPassPage() {
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your email to receive a password reset link"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
}
