/** @format */
"use client";

import React from "react";
import ProfileCard from "@/components/AdminComponents/SettingsComponents/ProfileCard";
import { useUserRole } from "@/contexts/UserRoleContext";

const adminUser = {
  name: "Admin User",
  email: "admin@gafbi.com",
  avatar: "/avatars/admin.jpg",
  role: "admin",
};

const SettingPage = () => {
  const { role } = useUserRole();

  const currentUser = {
    ...adminUser,
    role: role,
  };

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-semibold text-foreground mb-6">Settings</h1>
      <ProfileCard user={currentUser} />
    </div>
  );
};

export default SettingPage;
