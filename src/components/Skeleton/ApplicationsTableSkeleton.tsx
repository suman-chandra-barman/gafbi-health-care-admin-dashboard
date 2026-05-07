/** @format */
"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ApplicationsTableSkeleton = ({ rows = 10 }: { rows?: number }) => (
  <div className="w-full">
    <h1 className="text-[#124E78] text-[30px] font-bold tracking-[0.01em] uppercase leading-none mb-7">
      Manage Applications
    </h1>
    <div className="relative w-full max-w-110 mb-4">
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
    <div className="overflow-x-auto border border-[#e2e6eb] bg-white">
      <table className="w-full min-w-215 border-collapse text-left">
        <thead>
          <tr className="bg-[#e8edf2]">
            <th className="px-4 py-3 text-[14px] font-medium text-[#315e82] border-r border-[#d8dee6]">
              #ID
            </th>
            <th className="px-4 py-3 text-[14px] font-medium text-[#315e82] border-r border-[#d8dee6]">
              Date
            </th>
            <th className="px-4 py-3 text-[14px] font-medium text-[#315e82] border-r border-[#d8dee6]">
              Customer
            </th>
            <th className="px-4 py-3 text-[14px] font-medium text-[#315e82] border-r border-[#d8dee6]">
              Email
            </th>
            <th className="px-4 py-3 text-[14px] font-medium text-[#315e82]">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, idx) => (
            <tr
              key={idx}
              className="border-b border-[#e2e6eb] hover:bg-[#f9fafb] transition-colors"
            >
              <td className="px-4 py-3">
                <Skeleton className="h-5 w-10" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-5 w-24" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-5 w-32" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-5 w-40" />
              </td>
              <td className="px-4 py-3">
                <Skeleton className="h-5 w-16" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ApplicationsTableSkeleton;
