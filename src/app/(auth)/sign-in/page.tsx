/** @format */

import { AuthLayout, LoginForm } from "@/components/AuthComponents";

export default function SignInPage() {
  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
    >
      <LoginForm />
    </AuthLayout>
  );
}
