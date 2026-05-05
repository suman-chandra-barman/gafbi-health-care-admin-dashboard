/** @format */
"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface RoleSelectorProps {
  value: string;
  onChange: (value: "user" | "admin") => void;
}

const RoleSelector = ({ value, onChange }: RoleSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="role" className="text-sm font-medium text-primary">
        Select Role
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="role" className="w-full">
          <SelectValue placeholder="Select your role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="user">User</SelectItem>
          <SelectItem value="admin">Admin</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default RoleSelector;
