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
import type { Product } from "@/redux/features/product/productApi";

interface DeleteProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onConfirm: () => Promise<boolean>;
  isDeleting?: boolean;
}

const DeleteProductModal = ({
  isOpen,
  onClose,
  product,
  onConfirm,
  isDeleting,
}: DeleteProductModalProps) => {
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
          <DialogTitle className="flex justify-center items-center text-lg sm:text-xl font-semibold text-destructive">
            <Trash2 className="mr-2 h-5 w-5 sm:h-6 sm:w-6" /> Delete Product
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-4">
          <p className="mb-6 text-center text-foreground">
            Are you sure you want to delete?
          </p>
          <p className="mb-6 text-sm text-muted-foreground text-center">
            This action cannot be undone.
          </p>

          <div className="flex justify-center gap-4 w-full">
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

export default DeleteProductModal;
