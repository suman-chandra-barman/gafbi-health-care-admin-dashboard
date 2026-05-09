/** @format */
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { ContactMessage } from "@/redux/features/contact/contactApi";

interface DeleteContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact: ContactMessage | null;
  onConfirm: () => Promise<boolean>;
  isDeleting?: boolean;
}

const DeleteContactModal = ({
  isOpen,
  onClose,
  contact,
  onConfirm,
  isDeleting,
}: DeleteContactModalProps) => {
  const handleConfirm = async () => {
    const wasDeleted = await onConfirm();
    if (wasDeleted) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-lg font-semibold text-destructive sm:text-xl">
            <Trash2 className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Delete Contact
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-4">
          <p className="mb-2 text-center text-foreground">
            Are you sure you want to delete this message?
          </p>
          {contact ? (
            <p className="mb-6 text-center text-sm text-muted-foreground">
              {contact.first_name} {contact.last_name} - {contact.email}
            </p>
          ) : (
            <p className="mb-6 text-center text-sm text-muted-foreground">
              This action cannot be undone.
            </p>
          )}

          <div className="flex w-full justify-center gap-4">
            <Button variant="outline" onClick={onClose} className="w-1/2">
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleConfirm}
              disabled={isDeleting}
              className="w-1/2"
            >
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteContactModal;
