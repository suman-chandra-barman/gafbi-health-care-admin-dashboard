/** @format */
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  useGetApplicationDetailsQuery,
  useDecideApplicationMutation,
} from "@/redux/features/application/applicationApi";
import ApplicationDetailsSkeleton from "@/components/Skeleton/ApplicationDetailsSkeleton";
import { toast } from "react-toastify";

interface ApplicationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicationId: number | null;
}

const ApplicationDetailsModal = ({
  isOpen,
  onClose,
  applicationId,
}: ApplicationDetailsModalProps) => {
  const { data, isLoading, error, refetch } = useGetApplicationDetailsQuery(
    applicationId!,
    { skip: !applicationId },
  );
  const [decideApplication, { isLoading: isDeciding }] =
    useDecideApplicationMutation();
  const details = data?.data;

  const handleDecision = async (status: "approved" | "rejected") => {
    if (!applicationId) return;
    const admin_note =
      status === "approved" ? "Application approved" : "Invalid information";
    try {
      await decideApplication({
        id: applicationId,
        body: { status, admin_note },
      }).unwrap();
      toast.success(
        status === "approved" ? "Application approved" : "Application rejected",
      );
      onClose();
      refetch();
    } catch (err) {
      toast.error("Action failed. Please try again.");
    }
  };

  if (!applicationId) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-140 gap-0 overflow-hidden rounded-md border border-[#d9dde3] p-0">
        <DialogHeader className="border-b border-[#d9dde3] px-4 py-3">
          <DialogTitle className="text-[22px] font-semibold text-[#111827]">
            Applicant Details
          </DialogTitle>
        </DialogHeader>
        {isLoading || !details ? (
          <ApplicationDetailsSkeleton />
        ) : error ? (
          <div className="p-4 text-red-500">Error loading details.</div>
        ) : (
          <div className="max-h-[80vh] overflow-y-auto bg-[#f7f7f7] px-1 pb-4">
            <div className="mt-2 border border-[#d9dde3] bg-white">
              <div className="border-b border-[#d9dde3] bg-[#e8e8ea] px-3 py-2 text-[14px] font-semibold text-[#111827]">
                Gafbi Box
              </div>
              {details.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-[#eceef2] px-4 py-4 last:border-b-0"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}${item.product_image_url}`}
                      alt={item.product_name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded object-cover"
                    />
                    <div>
                      <p className="text-[15px] text-[#1f2937]">
                        {item.product_name}
                      </p>
                      <p className="text-[13px] text-[#6b7280]">
                        {item.unit_price} €
                      </p>
                    </div>
                  </div>
                  <p className="text-[15px] text-[#1f2937]">
                    {item.quantity} x
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-3 border border-[#d9dde3] bg-white">
              <div className="border-b border-[#d9dde3] bg-[#e8e8ea] px-3 py-2 text-[14px] font-semibold text-[#111827]">
                Data of the person to be cared for
              </div>

              <div className="border-b border-[#d9dde3] px-3 py-2 text-[14px] text-[#1c6fb0]">
                Personal details
              </div>

              <div className="grid grid-cols-2 border-b border-[#d9dde3] text-[14px] text-[#111827]">
                <div className="border-r border-[#d9dde3] px-3 py-2">For</div>
                <div className="px-3 py-2 text-right">
                  {details.gender || "-"}
                </div>
              </div>
              <div className="grid grid-cols-2 border-b border-[#d9dde3] text-[14px] text-[#111827]">
                <div className="border-r border-[#d9dde3] px-3 py-2">
                  First Name
                </div>
                <div className="px-3 py-2 text-right">
                  {details.first_name || "-"}
                </div>
              </div>
              <div className="grid grid-cols-2 border-b border-[#d9dde3] text-[14px] text-[#111827]">
                <div className="border-r border-[#d9dde3] px-3 py-2">
                  Last Name
                </div>
                <div className="px-3 py-2 text-right">
                  {details.last_name || "-"}
                </div>
              </div>
              <div className="grid grid-cols-2 border-b border-[#d9dde3] text-[14px] text-[#111827]">
                <div className="border-r border-[#d9dde3] px-3 py-2">
                  Date of birth
                </div>
                <div className="px-3 py-2 text-right">
                  {details.date_of_birth || "-"}
                </div>
              </div>
              <div className="grid grid-cols-2 border-b border-[#d9dde3] text-[14px] text-[#111827]">
                <div className="border-r border-[#d9dde3] px-3 py-2">
                  Care level
                </div>
                <div className="px-3 py-2 text-right">
                  {details.level_of_care ?? "-"}
                </div>
              </div>

              <div className="border-b border-[#d9dde3] px-3 py-2 text-[14px] text-[#1c6fb0]">
                Address
              </div>

              <div className="grid grid-cols-2 border-b border-[#d9dde3] text-[14px] text-[#111827]">
                <div className="border-r border-[#d9dde3] px-3 py-2">
                  Street & House
                </div>
                <div className="px-3 py-2 text-right">
                  {details.street_address || "-"}
                </div>
              </div>
              <div className="grid grid-cols-2 border-b border-[#d9dde3] text-[14px] text-[#111827]">
                <div className="border-r border-[#d9dde3] px-3 py-2">Area</div>
                <div className="px-3 py-2 text-right">
                  {details.area || "-"}
                </div>
              </div>
              <div className="grid grid-cols-2 border-b border-[#d9dde3] text-[14px] text-[#111827]">
                <div className="border-r border-[#d9dde3] px-3 py-2">City</div>
                <div className="px-3 py-2 text-right">
                  {details.city || "-"}
                </div>
              </div>
              <div className="grid grid-cols-2 border-b border-[#d9dde3] text-[14px] text-[#111827]">
                <div className="border-r border-[#d9dde3] px-3 py-2">
                  ZIP code
                </div>
                <div className="px-3 py-2 text-right">
                  {details.zip_code || "-"}
                </div>
              </div>

              <div className="border-b border-[#d9dde3] px-3 py-2 text-[14px] text-[#1c6fb0]">
                Contact details
              </div>

              <div className="grid grid-cols-2 border-b border-[#d9dde3] text-[14px] text-[#111827]">
                <div className="border-r border-[#d9dde3] px-3 py-2">Email</div>
                <div className="px-3 py-2 text-right">
                  {details.email || "-"}
                </div>
              </div>
              <div className="grid grid-cols-2 text-[14px] text-[#111827]">
                <div className="border-r border-[#d9dde3] px-3 py-2">
                  Phone number
                </div>
                <div className="px-3 py-2 text-right">
                  {details.phone_number || "-"}
                </div>
              </div>

              <div className="mt-4 px-4">
                <div className="flex gap-4">
                  <Button
                    disabled={isDeciding}
                    onClick={() => handleDecision("approved")}
                  >
                    Approve
                  </Button>
                  <Button
                    disabled={isDeciding}
                    onClick={() => handleDecision("rejected")}
                    variant="destructive"
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetailsModal;
