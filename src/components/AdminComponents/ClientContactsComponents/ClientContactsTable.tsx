/** @format */
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ContactMessage } from "@/redux/features/contact/contactApi";

interface ClientContactsTableProps {
  contacts: ContactMessage[];
  onDelete: (contact: ContactMessage) => void;
}

const ClientContactsTable = ({
  contacts,
  onDelete,
}: ClientContactsTableProps) => {
  return (
    <div className="w-full">
      <h1 className="mb-4 text-[34px] font-bold uppercase leading-none tracking-[0.01em] text-[#124E78]">
        Client Contacts
      </h1>

      <div className="overflow-x-auto rounded border border-[#e2e6eb] bg-white">
        <table className="w-full min-w-270 border-collapse text-left">
          <thead>
            <tr className="bg-[#e8edf2]">
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Name
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Email
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Phone
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Regarding
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Message
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Date
              </th>
              <th className="px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.length === 0 ? (
              <tr className="border-t border-[#e6e9ef]">
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-[15px] text-[#6b7280]"
                >
                  No contact messages found.
                </td>
              </tr>
            ) : (
              contacts.map((contact) => (
                <tr key={contact.id} className="border-t border-[#e6e9ef]">
                  <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                    {contact.first_name} {contact.last_name}
                  </td>
                  <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                    {contact.email}
                  </td>
                  <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                    {contact.telephone_number}
                  </td>
                  <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                    {contact.regarding}
                  </td>
                  <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                    <span className="line-clamp-2 block max-w-96">
                      {contact.news}
                    </span>
                  </td>
                  <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                    {new Date(contact.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(contact)}
                      className="h-8 rounded-md border-[#6b93b3] px-3 text-[14px] font-semibold text-[#165480]"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientContactsTable;
