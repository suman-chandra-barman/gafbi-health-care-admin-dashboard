/** @format */
"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ImageIcon } from "lucide-react";
import type { Product } from "./CatalogueTable";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (product: Product) => void;
}

interface FormData {
  productName: string;
  quantity: string;
  unit: string;
  description: string;
}

const EditProductModalContent = ({
  product,
  onClose,
  onSave,
}: {
  product: Product;
  onClose: () => void;
  onSave: (product: Product) => void;
}) => {
  const [formData, setFormData] = useState<FormData>({
    productName: product.productName,
    quantity: product.pcsMl.split(" ")[0] ?? "",
    unit: product.pcsMl.split(" ").slice(1).join(" ") || "ml/bottle",
    description: "",
  });
  const [fileName, setFileName] = useState("No File Chosen");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedValue = `${formData.quantity} ${formData.unit}`.trim();

    onSave({
      ...product,
      productName: formData.productName,
      pcsMl: formattedValue,
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="border-b border-[#e5e7eb] px-5 py-4">
        <h3 className="text-[18px] font-semibold text-[#165480]">
          Basic Information
        </h3>
      </div>

      <div className="space-y-7 px-5 py-6">
        <div className="space-y-2">
          <Label htmlFor="productName" className="text-[15px] text-[#111827]">
            Product Name
          </Label>
          <Input
            id="productName"
            value={formData.productName}
            onChange={(e) =>
              setFormData({ ...formData, productName: e.target.value })
            }
            placeholder="Product Name"
            className="h-11 border-[#d7dce2] text-[20px]"
          />
        </div>

        <div className="space-y-2">
          <div className="flex overflow-hidden rounded-md border border-[#d7dce2]">
            <input
              type="text"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              placeholder="75"
              className="h-11 w-full px-3 text-[30px] text-[#111827] outline-none"
            />
            <div className="flex h-11 min-w-[170px] items-center justify-between border-l border-[#d7dce2] bg-[#eef1f4] px-4 text-[28px] text-[#8b9098]">
              <span>{formData.unit}</span>
              <ChevronDown className="h-5 w-5" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-[15px] text-[#111827]">
            Product Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Describe..."
            className="min-h-[110px] resize-none border-[#d7dce2]"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-md bg-[#edf0f4] text-[#a5acb7]">
            <ImageIcon className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <p className="text-[14px] text-[#1f2937]">
              Please upload an image, size less than 5MB.
            </p>
            <div className="flex items-center gap-3">
              <label className="inline-flex h-10 cursor-pointer items-center rounded-md border border-[#165480] bg-[#ecf3f8] px-4 text-[14px] font-medium text-[#165480] hover:bg-[#e3edf5]">
                Choose File
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    setFileName(e.target.files?.[0]?.name || "No File Chosen")
                  }
                />
              </label>
              <span className="text-[14px] text-[#4b5563]">{fileName}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end border-t border-[#e5e7eb] px-5 py-4">
        <Button
          type="submit"
          className="h-11 rounded-md bg-[#165480] px-7 text-[32px] font-medium text-white hover:bg-[#124567]"
        >
          Add item
        </Button>
      </div>
    </form>
  );
};

const EditProductModal = ({
  isOpen,
  onClose,
  product,
  onSave,
}: EditProductModalProps) => {
  const defaultProduct: Product = {
    id: "",
    productId: "",
    productName: "",
    pcsMl: "",
    inventory: 203,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[720px] overflow-hidden rounded-md border border-[#d7dce2] p-0">
        <DialogHeader className="border-b border-[#e5e7eb] px-5 py-4">
          <DialogTitle className="text-[34px] font-bold text-[#165480]">
            Add a new item
          </DialogTitle>
        </DialogHeader>

        <EditProductModalContent
          product={product ?? defaultProduct}
          onClose={onClose}
          onSave={onSave}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
