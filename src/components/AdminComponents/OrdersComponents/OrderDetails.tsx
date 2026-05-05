/** @format */
"use client";

import React from "react";
import { Printer, Download, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Order } from "./OrdersTable";

interface OrderDetailsProps {
  order: Order;
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
  const router = useRouter();

  return (
    <div className="">
      <div className="flex items-center justify-between border-b border-[#d9dde3] px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d3d8df] text-[#124E78] hover:bg-[#edf3f8]"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <h1 className="text-[35px] font-bold uppercase text-[#124E78]">
            Order Details
          </h1>
        </div>
        <div className="flex items-center gap-5 text-[14px] text-[#111827]">
          <button
            type="button"
            className="inline-flex items-center gap-2 hover:underline"
          >
            Print
            <Printer className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 hover:underline"
          >
            Download
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-[36px] font-bold text-[#111827]">
          Order ID# {order.detailOrderNumber}
        </h2>
        <p className="mt-2 text-[14px] text-[#5b6470]">
          Order date: {order.createdDate}
        </p>
        <p className="mt-2 text-[14px] text-[#5b6470]">
          Delivery date: {order.deliveryDate}
        </p>
        <button
          type="button"
          className="mt-2 text-[15px] text-[#1c6fb0] hover:underline"
        >
          Item Details
        </button>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr_260px]">
          <div>
            <p className="text-[15px] font-medium text-[#111827]">
              Customer Name
            </p>
            <p className="mt-2 text-[15px] text-[#5b6470]">
              {order.customerName}
            </p>
            <button
              type="button"
              className="mt-2 text-[15px] text-[#1c6fb0] hover:underline"
            >
              Send Email
            </button>
          </div>

          <div>
            <p className="text-[15px] font-medium text-[#111827]">
              Shipping Address
            </p>
            {order.shippingAddress.split(",").map((line) => (
              <p key={line} className="mt-2 text-[15px] text-[#5b6470]">
                {line.trim()}
              </p>
            ))}
          </div>

          <div className="border border-[#d9dde3] bg-[#ececef]">
            <div className="border-b border-[#d9dde3] px-4 py-3 text-[15px] text-[#111827]">
              Gafbi Box item
            </div>
            {order.items.map((item) => (
              <div
                key={item.id}
                className="border-b border-[#d9dde3] px-4 py-2"
              >
                <div className="flex items-center justify-between text-[15px] text-[#165480]">
                  <span>{item.name}</span>
                  <span>{item.quantity}x</span>
                </div>
                <p className="mt-1 text-[13px] text-[#6b7280]">
                  {item.subtitle}
                </p>
              </div>
            ))}
            <div className="flex items-center justify-between px-4 py-3 text-[15px] text-[#111827]">
              <span>Total</span>
              <span>3 items of 6</span>
            </div>
          </div>
        </div>

        <div className="mt-8 overflow-x-auto border border-[#d9dde3] bg-white">
          <table className="w-full min-w-225 border-collapse text-left">
            <thead>
              <tr className="bg-[#e8e8ea]">
                <th className="border-r border-[#d9dde3] px-3 py-2 text-[13px] font-semibold text-[#111827]">
                  Req Qty
                </th>
                <th className="border-r border-[#d9dde3] px-3 py-2 text-[13px] font-semibold text-[#111827]">
                  Qty Updated
                </th>
                <th className="border-r border-[#d9dde3] px-3 py-2 text-[13px] font-semibold text-[#111827]">
                  Carrier
                </th>
                <th className="border-r border-[#d9dde3] px-3 py-2 text-[13px] font-semibold text-[#111827]">
                  Tracking No.
                </th>
                <th className="px-3 py-2 text-[13px] font-semibold text-[#111827]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-r border-t border-[#e1e4e9] px-3 py-3 text-[15px] text-[#111827]">
                  {order.requestedQty}
                </td>
                <td className="border-r border-t border-[#e1e4e9] px-3 py-3">
                  <button
                    type="button"
                    className="rounded border border-[#cfd5dd] bg-white px-3 py-1 text-[14px] text-[#111827]"
                  >
                    {order.qtyUpdated}
                  </button>
                </td>
                <td className="border-r border-t border-[#e1e4e9] px-3 py-3">
                  <select className="h-9 rounded border border-[#cfd5dd] bg-white px-3 text-[14px] text-[#374151] outline-none">
                    <option>Select carrier</option>
                  </select>
                </td>
                <td className="border-r border-t border-[#e1e4e9] px-3 py-3">
                  <input
                    value={order.trackingNo}
                    readOnly
                    className="h-9 w-35 rounded border border-[#cfd5dd] bg-white px-3 text-[14px] text-[#374151] outline-none"
                  />
                </td>
                <td className="border-t border-[#e1e4e9] px-3 py-3">
                  <button
                    type="button"
                    className="rounded-md bg-[#165480] px-4 py-2 text-[14px] font-semibold text-white hover:bg-[#124567]"
                  >
                    Confirm shipment
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
