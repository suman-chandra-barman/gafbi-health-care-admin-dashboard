/** @format */
"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ClientContactsTableSkeleton = ({ rows = 8 }: { rows?: number }) => (
  <div className="w-full">
    <div className="mb-4">
      <Skeleton className="h-10 w-64" />
    </div>

    <div className="overflow-x-auto border border-[#e2e6eb] bg-white">
      <table className="w-full min-w-270 border-collapse text-left">
        <thead>
          <tr className="bg-[#e8edf2]">
            {Array.from({ length: 8 }).map((_, index) => (
              <th
                key={`header-${index}`}
                className="border-r border-[#d8dee6] px-4 py-3"
              >
                <Skeleton className="h-4 w-20" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={`row-${rowIndex}`} className="border-t border-[#e6e9ef]">
              {Array.from({ length: 8 }).map((_, cellIndex) => (
                <td
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className="border-r border-[#e6e9ef] px-4 py-4"
                >
                  <Skeleton className="h-4 w-full" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ClientContactsTableSkeleton;
