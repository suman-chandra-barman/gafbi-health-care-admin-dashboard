/** @format */
"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/redux/features/product/productApi";

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
          className="h-11 rounded-md bg-[#165480] px-5 text-xl font-medium text-white hover:bg-[#124567]"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add new item
        </Button>
      </div>

      <div className="overflow-x-auto border border-[#e2e6eb] bg-white">
        <table className="w-full min-w-300 border-collapse text-left">
          <thead>
            <tr className="bg-[#e8edf2]">
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                #Product ID
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Image
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Product name
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Price
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Quantity
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Unit
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Avg rating
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
                  {product.product_id}
                </td>
                <td className="border-r border-[#e6e9ef] px-4 py-4">
                  <div className="flex items-center">
                    {product.image_url ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}${product.image_url}`}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded bg-[#eef1f4]" />
                    )}
                  </div>
                </td>
                <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                  {product.name}
                </td>
                <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                  {product.price}
                </td>
                <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                  {product.quantity}
                </td>
                <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                  {product.unit}
                </td>
                <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                  {Number.isFinite(product.average_rating)
                    ? product.average_rating.toFixed(1)
                    : "0.0"}
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
