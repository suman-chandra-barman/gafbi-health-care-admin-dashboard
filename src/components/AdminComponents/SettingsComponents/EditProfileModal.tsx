/** @format */
"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name?: string;
    email_address?: string;
    email?: string;
    image?: string | null;
  } | null;
  onSave: (values: { name: string; image: File | null }) => Promise<boolean>;
  isSaving?: boolean;
}

const EditProfileModalContent = ({
  user,
  onClose,
  onSave,
  isSaving,
}: {
  user: EditProfileModalProps["user"];
  onClose: () => void;
  onSave: (values: { name: string; image: File | null }) => Promise<boolean>;
  isSaving?: boolean;
}) => {
  const [name, setName] = useState(user?.name ?? "");
  const [image, setImage] = useState<File | null>(null);
  const [fileName, setFileName] = useState("No File Chosen");

  useEffect(() => {
    setName(user?.name ?? "");
    setImage(null);
    setFileName("No File Chosen");
  }, [user?.name, user?.image]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const wasSaved = await onSave({ name: name.trim(), image });
    if (wasSaved) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-5 px-5 py-6">
        <div className="space-y-2">
          <Label htmlFor="profileName" className="text-[15px] text-[#111827]">
            Full Name
          </Label>
          <Input
            id="profileName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className="h-11 border-[#d7dce2] text-[16px]"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="profileImage" className="text-[15px] text-[#111827]">
            Profile Image
          </Label>
          <div className="flex items-center gap-3">
            <label className="inline-flex h-10 cursor-pointer items-center rounded-md border border-[#165480] bg-[#ecf3f8] px-4 text-[14px] font-medium text-[#165480] hover:bg-[#e3edf5]">
              Choose File
              <input
                id="profileImage"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setFileName(file?.name || "No File Chosen");
                  setImage(file);
                }}
              />
            </label>
            <span className="text-[14px] text-[#4b5563]">{fileName}</span>
          </div>
          <p className="text-[13px] text-muted-foreground">
            Leave blank to keep the current image.
          </p>
        </div>
      </div>

      <div className="flex justify-end border-t border-[#e5e7eb] px-5 py-4">
        <Button
          type="submit"
          disabled={isSaving}
          className="h-11 rounded-md bg-[#165480] px-7 text-[16px] font-medium text-white hover:bg-[#124567]"
        >
          Save changes
        </Button>
      </div>
    </form>
  );
};

const EditProfileModal = ({
  isOpen,
  onClose,
  user,
  onSave,
  isSaving,
}: EditProfileModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl overflow-hidden rounded-md border border-[#d7dce2] p-0">
        <DialogHeader className="border-b border-[#e5e7eb] px-5 py-4">
          <DialogTitle className="text-[28px] font-bold text-[#165480]">
            Edit Profile
          </DialogTitle>
        </DialogHeader>

        <EditProfileModalContent
          user={user}
          onClose={onClose}
          onSave={onSave}
          isSaving={isSaving}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
