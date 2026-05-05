/** @format */
"use client";

import React from "react";
import { Plus, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Product {
  id: string;
  productId: string;
  productName: string;
  pcsMl: string;
  inventory: number;
}

interface CatalogueTableProps {
  products: Product[];
  onAddProduct: () => void;
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (product: Product) => void;
}

const CatalogueTable = ({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
}: CatalogueTableProps) => {
  return (
    <div className="w-full ">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-[#124E78] text-[32px] font-bold tracking-[0.01em] uppercase leading-none">
          Manage Catalogue
        </h1>
        <Button
          onClick={onAddProduct}
          className="h-11 rounded-md bg-[#165480] px-5 text-[28px] font-medium text-white hover:bg-[#124567]"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add a new item
        </Button>
      </div>

      <div className="overflow-x-auto border border-[#e2e6eb] bg-white">
        <table className="w-full min-w-245 border-collapse text-left">
          <thead>
            <tr className="bg-[#e8edf2]">
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                #Product ID
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Product name
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                pcs/ml
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Inventory
              </th>
              <th className="px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-[#e6e9ef]">
                <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                  {product.productId}
                </td>
                <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                  {product.productName}
                </td>
                <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                  {product.pcsMl}
                </td>
                <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                  <span className="inline-flex items-center gap-2 text-[#1f2937]">
                    <Dumbbell className="h-3.5 w-3.5 text-[#165480]" />
                    {product.inventory}
                    <Dumbbell className="h-3.5 w-3.5 text-[#165480]" />
                  </span>
                </td>
                <td className="px-4 py-4 text-[15px]">
                  <button
                    type="button"
                    onClick={() => onEditProduct(product)}
                    className="mr-4 text-[#165480] hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteProduct(product)}
                    className="text-[#ef4444] hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CatalogueTable;
