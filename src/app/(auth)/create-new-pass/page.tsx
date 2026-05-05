/** @format */

import { AuthLayout, CreateNewPasswordForm } from "@/components/AuthComponents";

export default function CreateNewPassPage() {
  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Enter your new password below"
    >
      <CreateNewPasswordForm />
    </AuthLayout>
  );
}
