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
import { FlaskConical } from "lucide-react";
import type { Application } from "./ApplicationsTable";

interface ApplicationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: Application | null;
}

const ApplicationDetailsModal = ({
  isOpen,
  onClose,
  application,
}: ApplicationDetailsModalProps) => {
  if (!application) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-140 gap-0 overflow-hidden rounded-md border border-[#d9dde3] p-0">
        <DialogHeader className="border-b border-[#d9dde3] px-4 py-3">
          <DialogTitle className="text-[22px] font-semibold text-[#111827]">
            Applicant Details
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[80vh] overflow-y-auto bg-[#f7f7f7] px-1 pb-4">
          <div className="mt-2 border border-[#d9dde3] bg-white">
            <div className="border-b border-[#d9dde3] bg-[#e8e8ea] px-3 py-2 text-[14px] font-semibold text-[#111827]">
              Gafbi Box
            </div>

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-center justify-between border-b border-[#eceef2] px-4 py-4 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-[#edf3f8] text-[#165480]">
                    <FlaskConical className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[15px] text-[#1f2937]">
                      Surface Disinfectant
                    </p>
                    <p className="text-[13px] text-[#6b7280]">500 ml</p>
                  </div>
                </div>
                <p className="text-[15px] text-[#1f2937]">1 x</p>
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
                {application.titleFor ?? "Mr"}
              </div>
            </div>
            <div className="grid grid-cols-2 border-b border-[#d9dde3] text-[14px] text-[#111827]">
              <div className="border-r border-[#d9dde3] px-3 py-2">
                First Name
              </div>
              <div className="px-3 py-2 text-right">
                {application.firstName ?? "Alex"}
              </div>
            </div>
            <div className="grid grid-cols-2 border-b border-[#d9dde3] text-[14px] text-[#111827]">
              <div className="border-r border-[#d9dde3] px-3 py-2">
                Last Name
              </div>
              <div className="px-3 py-2 text-right">
                {application.lastName ?? "Morgan"}
              </div>
            </div>
            <div className="grid grid-cols-2 border-b border-[#d9dde3] text-[14px] text-[#111827]">
              <div className="border-r border-[#d9dde3] px-3 py-2">
                Date of birth
              </div>
              <div className="px-3 py-2 text-right">
                {application.dateOfBirth ?? "November 28, 1978"}
              </div>
            </div>
            <div className="grid grid-cols-2 border-b border-[#d9dde3] text-[14px] text-[#111827]">
              <div className="border-r border-[#d9dde3] px-3 py-2">
                Care level
              </div>
              <div className="px-3 py-2 text-right">
                {application.careLevel ?? "level -3"}
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
                {application.streetHouse ?? "Value"}
              </div>
            </div>
            <div className="grid grid-cols-2 border-b border-[#d9dde3] text-[14px] text-[#111827]">
              <div className="border-r border-[#d9dde3] px-3 py-2">Area</div>
              <div className="px-3 py-2 text-right">
                {application.area ?? "Value"}
              </div>
            </div>
            <div className="grid grid-cols-2 border-b border-[#d9dde3] text-[14px] text-[#111827]">
              <div className="border-r border-[#d9dde3] px-3 py-2">City</div>
              <div className="px-3 py-2 text-right">
                {application.city ?? "Value"}
              </div>
            </div>
            <div className="grid grid-cols-2 border-b border-[#d9dde3] text-[14px] text-[#111827]">
              <div className="border-r border-[#d9dde3] px-3 py-2">
                ZIP code
              </div>
              <div className="px-3 py-2 text-right">
                {application.zipCode ?? "Value"}
              </div>
            </div>

            <div className="border-b border-[#d9dde3] px-3 py-2 text-[14px] text-[#1c6fb0]">
              Contact details
            </div>

            <div className="grid grid-cols-2 border-b border-[#d9dde3] text-[14px] text-[#111827]">
              <div className="border-r border-[#d9dde3] px-3 py-2">Email</div>
              <div className="px-3 py-2 text-right">{application.email}</div>
            </div>
            <div className="grid grid-cols-2 text-[14px] text-[#111827]">
              <div className="border-r border-[#d9dde3] px-3 py-2">
                Phone number
              </div>
              <div className="px-3 py-2 text-right">
                {application.phoneNumber ?? "Value"}
              </div>
            </div>
          </div>

          <div className="mt-3 flex justify-end gap-2 px-2">
            <Button
              type="button"
              onClick={onClose}
              className="h-9 rounded-md bg-[#dc2626] px-4 text-[14px] font-semibold text-white hover:bg-[#b91c1c]"
            >
              Decline
            </Button>
            <Button
              type="button"
              className="h-9 rounded-md bg-[#165480] px-4 text-[14px] font-semibold text-white hover:bg-[#124567]"
            >
              Approve request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ApplicationDetailsModal;
