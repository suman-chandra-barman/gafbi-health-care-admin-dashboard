/** @format */
"use client";

import React, { useState } from "react";
import CatalogueTable, {
  type Product,
} from "@/components/AdminComponents/CatalogueComponents/CatalogueTable";
import EditProductModal from "@/components/AdminComponents/CatalogueComponents/EditProductModal";
import DeleteProductModal from "@/components/AdminComponents/CatalogueComponents/DeleteProductModal";

const mockProducts: Product[] = [
  {
    id: "1",
    productId: "DS-FLS90121",
    productName: "G 5558",
    pcsMl: "9 Pcs /Box",
    inventory: 203,
  },
  {
    id: "2",
    productId: "DS-US82931E",
    productName: "G 5430 Active",
    pcsMl: "2 Pcs /Box",
    inventory: 203,
  },
  {
    id: "3",
    productId: "DS-JLS9181S",
    productName: "G 7431",
    pcsMl: "54 Pcs /Box",
    inventory: 203,
  },
  {
    id: "4",
    productId: "DS-JDUE019H",
    productName: "G 5420 Active Plus",
    pcsMl: "54 Pcs /Box",
    inventory: 203,
  },
  {
    id: "5",
    productId: "DS-US82931E",
    productName: "G 5001 Silver Edition",
    pcsMl: "5 Pcs /Box",
    inventory: 203,
  },
  {
    id: "6",
    productId: "DS-PS01ID92",
    productName: "G 5640 Autodos Excellence",
    pcsMl: "2 Pcs /Box",
    inventory: 203,
  },
  {
    id: "7",
    productId: "DS-FLS90121",
    productName: "G 5217 Selection",
    pcsMl: "4 Pcs /Box",
    inventory: 203,
  },
  {
    id: "8",
    productId: "DS-FG72TSOQ",
    productName: "G 5212 Autodos",
    pcsMl: "4.61 mL",
    inventory: 203,
  },
  {
    id: "9",
    productId: "DS-JDUE019H",
    productName: "G 5267 SCVI XXL Active plus",
    pcsMl: "0.31 mL",
    inventory: 203,
  },
  {
    id: "10",
    productId: "DS-J8273HOW",
    productName: "G 5222 Excellence",
    pcsMl: "3.90 mL",
    inventory: 203,
  },
  {
    id: "11",
    productId: "DS-J8273HOW",
    productName: "G 5222 Excellence",
    pcsMl: "3.13 mL",
    inventory: 203,
  },
  {
    id: "12",
    productId: "DS-FG72TSOQ",
    productName: "G 5212 Autodos",
    pcsMl: "4.61 mL",
    inventory: 203,
  },
  {
    id: "13",
    productId: "DS-ID92IE01",
    productName: "G 7455",
    pcsMl: "4.61 mL",
    inventory: 203,
  },
];

const CataloguePage = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  const handleSaveProduct = (updatedProduct: Product) => {
    if (updatedProduct.id) {
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
      );
      return;
    }

    const newId = `${products.length + 1}`;
    const newProductId = `DS-NEW${String(products.length + 1).padStart(4, "0")}`;

    setProducts((prev) => [
      ...prev,
      {
        ...updatedProduct,
        id: newId,
        productId: newProductId,
        inventory: 203,
      },
    ]);
  };

  const handleConfirmDelete = () => {
    if (selectedProduct) {
      setProducts((prev) => prev.filter((p) => p.id !== selectedProduct.id));
    }
  };

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
        onClose={() => setProductModalOpen(false)}
        product={selectedProduct}
        onSave={handleSaveProduct}
      />

      <DeleteProductModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        product={selectedProduct}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default CataloguePage;
