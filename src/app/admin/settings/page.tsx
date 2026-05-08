/** @format */
"use client";

import ProfileCard from "@/components/AdminComponents/SettingsComponents/ProfileCard";
import { useAppSelector } from "@/redux/hooks";

const SettingPage = () => {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-semibold text-foreground mb-6">Settings</h1>
      <ProfileCard user={user} />
    </div>
  );
};

export default SettingPage;
