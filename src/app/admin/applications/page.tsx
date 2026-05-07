/** @format */
"use client";

import React, { useState } from "react";
import ApplicationsTable from "@/components/AdminComponents/ApplicationsComponents/ApplicationsTable";
import ApplicationDetailsModal from "@/components/AdminComponents/ApplicationsComponents/ApplicationDetailsModal";
import { useGetApplicationsQuery } from "@/redux/features/application/applicationApi";
import ApplicationsTableSkeleton from "@/components/Skeleton/ApplicationsTableSkeleton";

const ApplicationsPage = () => {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const page = 1;

  const { data, isLoading, error } = useGetApplicationsQuery({
    search: "",
    page,
    limit: 10,
  });

  const handleViewDetails = (id: number) => {
    setSelectedId(id);
    setDetailsModalOpen(true);
  };

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading applications. Please try again.
      </div>
    );
  }

  return (
    <div className="">
      {isLoading ? (
        <ApplicationsTableSkeleton rows={10} />
      ) : (
        <ApplicationsTable
          applications={data?.data || []}
          onViewDetails={handleViewDetails}
        />
      )}
      <ApplicationDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        applicationId={selectedId}
      />
    </div>
  );
};

export default ApplicationsPage;
