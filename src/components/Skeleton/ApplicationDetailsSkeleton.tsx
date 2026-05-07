/** @format */
"use client";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ApplicationDetailsSkeleton = () => (
  <div className="p-6">
    <div className="mb-4">
      <Skeleton className="h-8 w-1/2 mb-2" />
      <Skeleton className="h-6 w-1/3" />
    </div>
    <div className="mb-4">
      <Skeleton className="h-6 w-1/4 mb-2" />
      <Skeleton className="h-6 w-1/2" />
    </div>
    <div className="mb-4">
      <Skeleton className="h-6 w-1/3 mb-2" />
      <Skeleton className="h-6 w-1/4" />
    </div>
    <div className="mb-4">
      <Skeleton className="h-6 w-1/2 mb-2" />
      <Skeleton className="h-6 w-1/3" />
    </div>
    <div className="mb-4">
      <Skeleton className="h-8 w-full" />
    </div>
    <div className="flex gap-4 mt-6">
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-10 w-32" />
    </div>
  </div>
);

export default ApplicationDetailsSkeleton;
