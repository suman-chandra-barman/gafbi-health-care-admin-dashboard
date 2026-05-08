/** @format */
"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CatalogueTableSkeleton = ({ rows = 8 }: { rows?: number }) => (
  <div className="w-full">
    <div className="mb-4 flex items-center justify-between gap-3">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-11 w-40" />
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
          {Array.from({ length: rows }).map((_, index) => (
            <tr key={index} className="border-t border-[#e6e9ef]">
              <td className="border-r border-[#e6e9ef] px-4 py-4">
                <Skeleton className="h-5 w-24" />
              </td>
              <td className="border-r border-[#e6e9ef] px-4 py-4">
                <Skeleton className="h-12 w-12 rounded" />
              </td>
              <td className="border-r border-[#e6e9ef] px-4 py-4">
                <Skeleton className="h-5 w-40" />
              </td>
              <td className="border-r border-[#e6e9ef] px-4 py-4">
                <Skeleton className="h-5 w-20" />
              </td>
              <td className="border-r border-[#e6e9ef] px-4 py-4">
                <Skeleton className="h-5 w-16" />
              </td>
              <td className="border-r border-[#e6e9ef] px-4 py-4">
                <Skeleton className="h-5 w-16" />
              </td>
              <td className="border-r border-[#e6e9ef] px-4 py-4">
                <Skeleton className="h-5 w-12" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="h-8 w-24" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default CatalogueTableSkeleton;
