/** @format */
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import type { ApplicationListItem } from "@/redux/features/application/applicationApi";

interface ApplicationsTableProps {
  applications: ApplicationListItem[];
  onViewDetails: (id: number) => void;
}

const ApplicationsTable = ({
  applications,
  onViewDetails,
}: ApplicationsTableProps) => {
  return (
    <div className="w-full ">
      <h1 className="mb-4 text-[34px] font-bold uppercase leading-none tracking-[0.01em] text-[#124E78]">
        Manage Applications
      </h1>

      <div className="overflow-x-auto rounded border border-[#e2e6eb] bg-white">
        <table className="w-full min-w-245 border-collapse text-left">
          <thead>
            <tr className="bg-[#e8edf2]">
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Application Date
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Customer
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Email
              </th>
              <th className="px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.map((application) => (
              <tr key={application.id} className="border-t border-[#e6e9ef]">
                <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                  {new Date(application.application_date).toLocaleDateString()}
                </td>
                <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                  {application.customer}
                </td>
                <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                  {application.email}
                </td>
                <td className="px-4 py-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(application.id)}
                    className="h-8 rounded-md border-[#6b93b3] px-3 text-[14px] font-semibold text-[#165480]"
                  >
                    Applicant Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsTable;
