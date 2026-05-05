/** @format */
"use client";

import React, { useState } from "react";
import ApplicationsTable, {
  type Application,
} from "@/components/AdminComponents/ApplicationsComponents/ApplicationsTable";
import ApplicationDetailsModal from "@/components/AdminComponents/ApplicationsComponents/ApplicationDetailsModal";

const mockApplications: Application[] = [
  {
    id: "1",
    applicationDate: "May 20, 2015",
    customer: "Cameron Williamson",
    email: "debbie.baker@example.com",
  },
  {
    id: "2",
    applicationDate: "March 6, 2018",
    customer: "Savannah Nguyen",
    email: "nathan.roberts@example.com",
  },
  {
    id: "3",
    applicationDate: "February 9, 2015",
    customer: "Ronald Richards",
    email: "jackson.graham@example.com",
  },
  {
    id: "4",
    applicationDate: "March 23, 2013",
    customer: "Ralph Edwards",
    email: "willie.jennings@example.com",
  },
  {
    id: "5",
    applicationDate: "May 31, 2015",
    customer: "Esther Howard",
    email: "bill.sanders@example.com",
  },
  {
    id: "6",
    applicationDate: "October 31, 2017",
    customer: "Leslie Alexander",
    email: "georgia.young@example.com",
  },
  {
    id: "7",
    applicationDate: "November 16, 2014",
    customer: "Robert Fox",
    email: "tanya.hill@example.com",
  },
  {
    id: "8",
    applicationDate: "December 19, 2013",
    customer: "Darrell Steward",
    email: "michelle.rivera@example.com",
  },
  {
    id: "9",
    applicationDate: "October 25, 2019",
    customer: "Albert Flores",
    email: "sara.cruz@example.com",
  },
  {
    id: "10",
    applicationDate: "May 9, 2014",
    customer: "Wade Warren",
    email: "nevaeh.simmons@example.com",
  },
  {
    id: "11",
    applicationDate: "February 28, 2018",
    customer: "Jenny Wilson",
    email: "alma.lawson@example.com",
  },
  {
    id: "12",
    applicationDate: "August 2, 2013",
    customer: "Guy Hawkins",
    email: "tim.jennings@example.com",
  },
  {
    id: "13",
    applicationDate: "October 30, 2017",
    customer: "Kristin Watson",
    email: "kenzi.lawson@example.com",
  },
];

const ApplicationsPage = () => {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  const handleViewDetails = (application: Application) => {
    setSelectedApplication(application);
    setDetailsModalOpen(true);
  };

  return (
    <div className="">
      <ApplicationsTable
        applications={mockApplications}
        onViewDetails={handleViewDetails}
      />

      <ApplicationDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        application={selectedApplication}
      />
    </div>
  );
};

export default ApplicationsPage;
