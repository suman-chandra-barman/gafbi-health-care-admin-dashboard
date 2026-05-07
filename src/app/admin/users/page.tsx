/** @format */
"use client";

import React, { useState, useCallback } from "react";
import UsersTable from "@/components/AdminComponents/UsersComponents/UsersTable";
import UsersTableSkeleton from "@/components/Skeleton/UsersTableSkeleton";
import { useGetUsersQuery } from "@/redux/features/user/userApi";

const UsersPage = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset to first page on search
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, error } = useGetUsersQuery({
    search: debouncedSearch,
    page,
    limit: 10,
  });

  const handleSearch = useCallback((searchTerm: string) => {
    setSearch(searchTerm);
  }, []);

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading users. Please try again.
      </div>
    );
  }

  return (
    <div className="">
      {isLoading ? (
        <UsersTableSkeleton rows={10} />
      ) : (
        <UsersTable users={data?.data || []} onSearch={handleSearch} />
      )}
    </div>
  );
};

export default UsersPage;
