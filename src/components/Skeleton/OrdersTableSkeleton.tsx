/** @format */
"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const OrdersTableSkeleton = ({ rows = 8 }: { rows?: number }) => (
  <div className="w-full">
    <h1 className="text-[34px] font-bold uppercase leading-none tracking-[0.01em] text-[#124E78] mb-4">
      Manage Orders
    </h1>

    <div className="mb-3 flex flex-wrap items-center gap-4">
      <div className="relative w-full max-w-117.5">
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <div className="flex items-center gap-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-24 rounded-full" />
        ))}
      </div>
    </div>

    <div className="overflow-x-auto rounded border border-[#e2e6eb] bg-white">
      <table className="w-full min-w-270 border-collapse text-left">
        <thead>
          <tr className="bg-[#e8edf2]">
            <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
              #Order ID
            </th>
            <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
              Order Date
            </th>
            <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
              Customer
            </th>
            <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
              Shipment Status
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
                <Skeleton className="h-5 w-28" />
              </td>
              <td className="border-r border-[#e6e9ef] px-4 py-4">
                <Skeleton className="h-5 w-32" />
              </td>
              <td className="border-r border-[#e6e9ef] px-4 py-4">
                <Skeleton className="h-5 w-24" />
              </td>
              <td className="px-4 py-4">
                <Skeleton className="h-8 w-28" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default OrdersTableSkeleton;
