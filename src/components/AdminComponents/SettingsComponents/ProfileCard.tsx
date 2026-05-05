/** @format */
"use client";

import React from "react";

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

interface ProfileCardProps {
  user: UserProfile;
}

const ProfileAvatar = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center border-4 border-primary/20">
      <span className="text-primary-foreground font-bold text-2xl">
        {initials}
      </span>
    </div>
  );
};

const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <div className="bg-card rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">
        Profile Information
      </h2>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <ProfileAvatar name={user.name} />

        <div className="flex-1 text-center sm:text-left space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Full Name</p>
            <p className="text-lg font-semibold text-foreground">{user.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email Address</p>
            <p className="text-lg font-medium text-foreground">{user.email}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <span className="inline-block px-3 py-1 rounded-md text-sm font-medium bg-primary/10 text-primary capitalize">
              {user.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
