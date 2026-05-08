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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon } from "lucide-react";
import type { Product } from "@/redux/features/product/productApi";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (product: ProductFormValues) => Promise<boolean>;
  isSaving?: boolean;
}

export interface ProductFormValues {
  id?: number;
  name: string;
  price: string;
  quantity: string;
  unit: string;
  description: string;
  image?: File | null;
}

const EditProductModalContent = ({
  product,
  onClose,
  onSave,
  isSaving,
}: {
  product: Product;
  onClose: () => void;
  onSave: (product: ProductFormValues) => Promise<boolean>;
  isSaving?: boolean;
}) => {
  const [formData, setFormData] = useState<ProductFormValues>({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    unit: product.unit,
    description: product.description ?? "",
    image: null,
  });
  const [fileName, setFileName] = useState("No File Chosen");
  const isEditing = Boolean(product.id);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const wasSaved = await onSave(formData);
    if (wasSaved) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-5 pt-4">
        <h3 className="text-[18px] font-semibold text-[#165480]">
          Basic Information
        </h3>
      </div>

      <div className="space-y-7 px-5 py-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="productName" className="text-[15px] text-[#111827]">
              Product Name
            </Label>
            <Input
              id="productName"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Product Name"
              className="h-11 border-[#d7dce2] text-[20px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className="text-[15px] text-[#111827]">
              Price
            </Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              placeholder="25.00"
              className="h-11 border-[#d7dce2] text-[20px]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-[15px] text-[#111827]">
              Quantity
            </Label>
            <Input
              type="number"
              id="quantity"
              value={formData.quantity}
              onChange={(e) =>
                setFormData({ ...formData, quantity: e.target.value })
              }
              placeholder="0.20"
              disabled={isEditing}
              className="h-11 border-[#d7dce2] text-[20px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="unit" className="text-[15px] text-[#111827]">
              Unit
            </Label>
            <Select
              value={formData.unit}
              onValueChange={(value) =>
                setFormData({ ...formData, unit: value })
              }
              disabled={isEditing}
            >
              <SelectTrigger
                id="unit"
                className="h-11! w-full border-[#d7dce2]"
              >
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ml">ml</SelectItem>
                <SelectItem value="pcs">pcs</SelectItem>
                <SelectItem value="box">box</SelectItem>
              </SelectContent>
            </Select>
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
            className="min-h-27.5 resize-none border-[#d7dce2]"
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
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setFileName(file?.name || "No File Chosen");
                    setFormData((prev) => ({
                      ...prev,
                      image: file,
                    }));
                  }}
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
          disabled={isSaving}
          className="h-11 rounded-md bg-[#165480] px-7 text-xl font-medium text-white hover:bg-[#124567]"
        >
          {product.id ? "Save changes" : "Add item"}
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
  isSaving,
}: EditProductModalProps) => {
  const defaultProduct: Product = {
    id: 0,
    image_url: "",
    product_id: "",
    name: "",
    price: "",
    quantity: "",
    unit: "",
    quantity_with_unit: "",
    description: "",
    is_active: true,
    average_rating: 0,
    total_reviews: 0,
    created_at: "",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-180 overflow-hidden rounded-md border border-[#d7dce2] p-0">
        <DialogHeader className="border-b border-[#e5e7eb] px-5 py-4">
          <DialogTitle className="text-[34px] font-bold text-[#165480]">
            Add a new item
          </DialogTitle>
        </DialogHeader>

        <EditProductModalContent
          key={product?.id ?? "new"}
          product={product ?? defaultProduct}
          onClose={onClose}
          onSave={onSave}
          isSaving={isSaving}
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
