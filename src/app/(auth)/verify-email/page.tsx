/** @format */

import { AuthLayout, VerifyEmailForm } from "@/components/AuthComponents";

export default function VerifyEmailPage() {
  return (
    <AuthLayout title="Verify Your Email" subtitle="">
      <VerifyEmailForm />
    </AuthLayout>
  );
}
