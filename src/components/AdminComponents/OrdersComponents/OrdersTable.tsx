/** @format */
"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Order {
  id: string;
  orderId: string;
  orderDate: string;
  productId: string;
  customerName: string;
  shippingCarrier: string;
  status: "Shipped" | "Unshipped" | "Cancelled";
  detailOrderNumber: string;
  createdDate: string;
  deliveryDate: string;
  shippingAddress: string;
  requestedQty: string;
  qtyUpdated: string;
  trackingNo: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  subtitle: string;
}

interface OrdersTableProps {
  orders: Order[];
}

const OrdersTable = ({ orders }: OrdersTableProps) => {
  const router = useRouter();
  const [activeStatus, setActiveStatus] =
    useState<Order["status"]>("Unshipped");

  const filteredOrders = useMemo(
    () => orders.filter((order) => order.status === activeStatus),
    [orders, activeStatus],
  );

  const handleViewDetails = (order: Order) => {
    router.push(`/admin/orders/${order.id}`);
  };

  return (
    <div className="w-full ">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h1 className="text-[34px] font-bold uppercase leading-none tracking-[0.01em] text-[#124E78]">
          Manage Orders
        </h1>
        <Button className="h-11 rounded-md bg-[#165480] px-5 text-[30px] font-medium text-white hover:bg-[#124567]">
          <Plus className="mr-2 h-5 w-5" />
          Add a new item
        </Button>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-4">
        <div className="relative w-full max-w-117.5">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9ca3af]" />
          <input
            type="text"
            placeholder="Search by user id or name"
            className="h-10 w-full rounded-md border border-[#d5d9df] bg-white pl-9 pr-3 text-sm text-[#374151] placeholder:text-[#9ca3af] outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-[20px]">
          <button
            type="button"
            onClick={() => setActiveStatus("Shipped")}
            className={`rounded-full px-4 py-1 ${
              activeStatus === "Shipped"
                ? "bg-[#165480] font-semibold text-white"
                : "text-[#374151]"
            }`}
          >
            Shipped
          </button>
          <button
            type="button"
            onClick={() => setActiveStatus("Unshipped")}
            className={`rounded-full px-4 py-1 ${
              activeStatus === "Unshipped"
                ? "bg-[#165480] font-semibold text-white"
                : "text-[#374151]"
            }`}
          >
            Unshipped
          </button>
          <button
            type="button"
            onClick={() => setActiveStatus("Cancelled")}
            className={`rounded-full px-4 py-1 ${
              activeStatus === "Cancelled"
                ? "bg-[#165480] font-semibold text-white"
                : "text-[#374151]"
            }`}
          >
            Cancelled
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded border border-[#e2e6eb] bg-white">
        <table className="w-full min-w-270 border-collapse text-left">
          <thead>
            <tr className="bg-[#e8edf2]">
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                #Order ID
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Order Date
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                #Product ID
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Customer
              </th>
              <th className="border-r border-[#d8dee6] px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Shipping Carrier
              </th>
              <th className="px-4 py-3 text-[14px] font-medium text-[#315e82]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-t border-[#e6e9ef]">
                <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                  {order.orderId}
                </td>
                <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                  {order.orderDate}
                </td>
                <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                  {order.productId}
                </td>
                <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                  {order.customerName}
                </td>
                <td className="border-r border-[#e6e9ef] px-4 py-4 text-[15px] text-[#1f2937]">
                  {order.shippingCarrier}
                </td>
                <td className="px-4 py-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(order)}
                    className="h-8 rounded-md border-[#6b93b3] px-3 text-[14px] font-semibold text-[#165480] hover:bg-[#eff5fa]"
                  >
                    Order details
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

export default OrdersTable;
