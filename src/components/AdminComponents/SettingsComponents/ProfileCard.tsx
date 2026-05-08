/** @format */
"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import EditProfileModal from "@/components/AdminComponents/SettingsComponents/EditProfileModal";
import { useUpdateAdminProfileMutation } from "@/redux/features/auth/authApi";

interface UserProfile {
  id?: string;
  name?: string;
  email_address?: string;
  email?: string;
  image?: string | null;
  role?: string;
}

interface ProfileCardProps {
  user: UserProfile | null;
  isLoading?: boolean;
}

 const ProfileAvatar = ({
  name,
  image,
}: {
  name: string;
  image?: string | null;
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  if (image) {
    return (
      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
        <Image
          src={`${process.env.NEXT_PUBLIC_BASE_URL}${image}`}
          alt={name}
          width={96}
          height={96}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center border-4 border-primary/20">
      <span className="text-primary-foreground font-bold text-2xl">
        {initials || "U"}
      </span>
    </div>
  );
};

const ProfileCard = ({ user, isLoading }: ProfileCardProps) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [updateAdminProfile, { isLoading: isSaving }] =
    useUpdateAdminProfileMutation();

  const displayName = useMemo(
    () => user?.name?.trim() || "Unknown User",
    [user?.name],
  );
  const displayEmail = user?.email_address || user?.email || "-";
  const displayRole = user?.role || "-";

  const handleSave = async (values: { name: string; image: File | null }) => {
    if (!values.name) {
      return false;
    }

    const formData = new FormData();
    formData.append("name", values.name);
    if (values.image) {
      formData.append("image", values.image);
    }

    try {
      await updateAdminProfile(formData).unwrap();
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="bg-card rounded-lg p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">
          Profile Information
        </h2>
        <Button
          type="button"
          onClick={() => setIsEditOpen(true)}
          disabled={!user || isLoading}
          className="h-10 rounded-md bg-[#165480] px-6 text-[15px] font-medium text-white hover:bg-[#124567]"
        >
          Edit Profile
        </Button>
      </div>

      {isLoading && !user ? (
        <p className="text-sm text-muted-foreground">Loading profile...</p>
      ) : (
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <ProfileAvatar name={displayName} image={user?.image} />

          <div className="flex-1 text-center sm:text-left space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="text-lg font-semibold text-foreground">
                {displayName}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Email Address</p>
              <p className="text-lg font-medium text-foreground">
                {displayEmail}
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <span className="inline-block px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary capitalize">
                {displayRole}
              </span>
            </div>
          </div>
        </div>
      )}

      <EditProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        user={user}
        onSave={handleSave}
        isSaving={isSaving}
      />
    </div>
  );
};

export default ProfileCard;
