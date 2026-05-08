/** @format */
"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CatalogueTable from "@/components/AdminComponents/CatalogueComponents/CatalogueTable";
import EditProductModal, {
  type ProductFormValues,
} from "@/components/AdminComponents/CatalogueComponents/EditProductModal";
import DeleteProductModal from "@/components/AdminComponents/CatalogueComponents/DeleteProductModal";
import CatalogueTableSkeleton from "@/components/Skeleton/CatalogueTableSkeleton";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  type Product,
} from "@/redux/features/product/productApi";

const CataloguePage = () => {
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { data, isLoading, isError } = useGetProductsQuery({
    page: 1,
    limit: 50,
  });
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();
  const products = data?.data ?? [];

  useEffect(() => {
    if (isError) {
      toast.error("Failed to load products.");
    }
  }, [isError]);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setProductModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleSaveProduct = async (payload: ProductFormValues) => {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("price", payload.price);
    formData.append("description", payload.description);
    if (payload.image) {
      formData.append("image", payload.image, payload.image.name);
    }

    try {
      if (payload.id) {
        await updateProduct({ id: payload.id, body: formData }).unwrap();
        toast.success("Product updated successfully.");
      } else {
        formData.append("quantity", payload.quantity);
        formData.append("unit", payload.unit);
        await createProduct(formData).unwrap();
        toast.success("Product created successfully.");
      }
      return true;
    } catch {
      toast.error("Failed to save product.");
      return false;
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedProduct) {
      return false;
    }

    try {
      await deleteProduct(selectedProduct.id).unwrap();
      toast.success("Product deleted successfully.");
      return true;
    } catch {
      toast.error("Failed to delete product.");
      return false;
    }
  };

  const handleCloseProductModal = () => {
    setProductModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  if (isLoading) {
    return (
      <div className="">
        <CatalogueTableSkeleton />
      </div>
    );
  }

  return (
    <div className="">
      <CatalogueTable
        products={products}
        onAddProduct={handleAddProduct}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />

      <EditProductModal
        isOpen={productModalOpen}
        onClose={handleCloseProductModal}
        product={selectedProduct}
        onSave={handleSaveProduct}
        isSaving={isCreating || isUpdating}
      />

      <DeleteProductModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        product={selectedProduct}
        onConfirm={handleConfirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default CataloguePage;
