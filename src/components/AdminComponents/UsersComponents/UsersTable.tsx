/** @format */
"use client";

import React from "react";
import { Search } from "lucide-react";

interface UserData {
  userId: string;
  name: string;
  email: string;
  joined: string;
  careLevel: string;
}

interface UsersTableProps {
  users: UserData[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <div className="w-full ">
      <h1 className="text-[#124E78] text-[30px] font-bold tracking-[0.01em] uppercase leading-none mb-7">
        Manage Users
      </h1>

      <div className="relative w-full max-w-110 mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9ca3af]" />
        <input
          type="text"
          placeholder="Search by user id or name"
          className="h-10 w-full rounded-md border border-[#d5d9df] bg-white pl-9 pr-3 text-sm text-[#374151] placeholder:text-[#9ca3af] outline-none focus:border-[#c6ced9]"
        />
      </div>

      <div className="overflow-x-auto border border-[#e2e6eb] bg-white">
        <table className="w-full min-w-215 border-collapse text-left">
          <thead>
            <tr className="bg-[#e8edf2]">
              <th className="px-4 py-3 text-[14px] font-medium text-[#315e82] border-r border-[#d8dee6]">
                #UserID
              </th>
              <th className="px-4 py-3 text-[14px] font-medium text-[#315e82] border-r border-[#d8dee6]">
                Name
              </th>
              <th className="px-4 py-3 text-[14px] font-medium text-[#315e82] border-r border-[#d8dee6]">
                Register email
              </th>
              <th className="px-4 py-3 text-[14px] font-medium text-[#315e82] border-r border-[#d8dee6]">
                Joined
              </th>
              <th className="px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Care level
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={`${user.userId}-${user.email}`}
                className="border-t border-[#e6e9ef]"
              >
                <td className="px-4 py-4 text-[15px] text-[#1f2937] border-r border-[#e6e9ef]">
                  {user.userId}
                </td>
                <td className="px-4 py-4 text-[15px] text-[#1f2937] border-r border-[#e6e9ef]">
                  {user.name}
                </td>
                <td className="px-4 py-4 text-[15px] text-[#1f2937] border-r border-[#e6e9ef]">
                  {user.email}
                </td>
                <td className="px-4 py-4 text-[15px] text-[#1f2937] border-r border-[#e6e9ef]">
                  {user.joined}
                </td>
                <td className="px-4 py-4 text-[15px] text-[#1f2937]">
                  {user.careLevel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
