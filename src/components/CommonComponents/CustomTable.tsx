/** @format */
"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface CustomTableProps<T> {
  data: T[];
  columns: {
    header: string;
    accessor: keyof T | ((row: T) => React.ReactNode);
    className?: string;
  }[];
  itemsPerPage?: number;
  title?: string;
  actionColumn?: {
    header: string;
    render: (row: T) => React.ReactNode;
  };
}

const CustomTable = <T extends object>({
  data,
  columns,
  itemsPerPage = 10,
  title,
  actionColumn,
}: CustomTableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "in progress":
        return "bg-cyan-100 text-cyan-700";
      case "complete":
      case "completed":
        return "bg-green-100 text-green-700";
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "shipped":
        return "bg-blue-100 text-blue-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const renderCell = (row: T, column: (typeof columns)[0]) => {
    if (typeof column.accessor === "function") {
      return column.accessor(row);
    }

    const value = row[column.accessor as keyof T];

    if (column.header === "Status" && typeof value === "string") {
      return (
        <div
          className={cn(
            "w-24 px-2 py-1 flex justify-center items-center rounded-md text-sm font-medium",
            getStatusColor(value),
          )}
        >
          {value}
        </div>
      );
    }

    return value as React.ReactNode;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="w-full space-y-3 sm:space-y-4 overflow-x-auto">
      {title && (
        <div className="px-2 sm:px-0">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground">
            {title}
          </h2>
        </div>
      )}

      <div className="rounded-lg overflow-hidden border border-border sm:border-0">
        <div className="overflow-x-auto">
          <Table className="border-none min-w-full">
            <TableHeader>
              <TableRow className="bg-muted hover:bg-muted border-none">
                {columns.map((column, index) => (
                  <TableHead
                    key={index}
                    className={cn(
                      "font-semibold text-foreground text-xs sm:text-sm py-2 sm:py-3 whitespace-nowrap",
                      column.className,
                    )}
                  >
                    {column.header}
                  </TableHead>
                ))}
                {actionColumn && (
                  <TableHead className="font-semibold text-foreground text-xs sm:text-sm py-2 sm:py-3 whitespace-nowrap">
                    {actionColumn.header}
                  </TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentData.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  className="hover:bg-muted/50 transition-colors"
                >
                  {columns.map((column, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className={cn(
                        "text-foreground py-3 sm:py-5 text-xs sm:text-sm whitespace-nowrap",
                        column.className,
                      )}
                    >
                      {renderCell(row, column)}
                    </TableCell>
                  ))}
                  {actionColumn && (
                    <TableCell className="py-3 sm:py-5">
                      {actionColumn.render(row)}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent className="flex-wrap gap-1">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={cn(
                  "text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4",
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer",
                )}
              />
            </PaginationItem>

            {getPageNumbers().map((page, index) => (
              <PaginationItem key={index} className="hidden xs:inline-flex">
                {page === "..." ? (
                  <PaginationEllipsis className="h-8 sm:h-10" />
                ) : (
                  <PaginationLink
                    onClick={() => handlePageChange(page as number)}
                    isActive={currentPage === page}
                    className={cn(
                      "cursor-pointer text-xs sm:text-sm h-8 sm:h-10 w-8 sm:w-10",
                      currentPage === page &&
                        "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
                    )}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem className="xs:hidden">
              <PaginationLink
                isActive={true}
                className="cursor-default bg-primary text-primary-foreground h-8 w-8 text-xs"
              >
                {currentPage}
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={cn(
                  "text-xs sm:text-sm h-8 sm:h-10 px-2 sm:px-4",
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer",
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};

export default CustomTable;
