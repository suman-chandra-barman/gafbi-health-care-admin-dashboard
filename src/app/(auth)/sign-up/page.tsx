/** @format */

import { AuthLayout, SignupForm } from "@/components/AuthComponents";

export default function SignUpPage() {
  return (
    <AuthLayout title="Create Account" subtitle="Join Gafbi Health Care today">
      <SignupForm />
    </AuthLayout>
  );
}
