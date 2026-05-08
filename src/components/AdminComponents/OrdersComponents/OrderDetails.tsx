/** @format */
"use client";

import React, { useRef } from "react";
import { Printer, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import type { OrderDetails as OrderDetailsData } from "@/redux/features/order/orderApi";

interface OrderDetailsProps {
  order: OrderDetailsData;
  onConfirmShipment?: () => void;
  isConfirming?: boolean;
}

const OrderDetails = ({
  order,
  onConfirmShipment,
  isConfirming = false,
}: OrderDetailsProps) => {
  const router = useRouter();
  const printRef = useRef<HTMLDivElement | null>(null);
  const statusText = order.status || "pending";
  const summaryItems = [
    { label: "Order date", value: order.order_date },
    { label: "Delivery date", value: order.delivery_date ?? "N/A" },
    { label: "Total amount", value: order.total_amount },
    { label: "Shipped quantity", value: String(order.shipped_quantity) },
    { label: "Tracking number", value: order.tracking_number ?? "N/A" },
    { label: "Shipping carrier", value: order.shipping_carrier ?? "N/A" },
  ];

  const handlePrint = () => {
    if (!printRef.current) {
      return;
    }
    window.print();
  };

  return (
    <div>
      <div className="flex items-center justify-between border-b border-[#d9dde3] px-4 py-4 print:hidden">
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
            onClick={handlePrint}
            className="inline-flex items-center gap-2 hover:underline"
          >
            Print
            <Printer className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* order id section  */}
      <div ref={printRef} className="print-area p-4">
        <div className="flex flex-wrap items-start justify-between gap-4 rounded-lg border border-[#e3e7ee] bg-white p-5">
          <div>
            <p className="text-[13px] uppercase tracking-[0.2em] text-[#6b7280]">
              Order
            </p>
            <h2 className="mt-2 text-[32px] font-bold text-[#111827]">
              Order ID# {order.order_id}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#edf3f8] px-3 py-1 text-[12px] font-semibold uppercase text-[#124E78]">
              {statusText}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="mt-2 text-[15px] text-[#1c6fb0] print:hidden"
        >
          Item Details
        </button>

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[2fr_1.2fr]">
          <div className="rounded-lg border border-[#e3e7ee] bg-white p-5">
            <p className="text-[13px] uppercase tracking-[0.2em] text-[#6b7280]">
              Customer & Shipping
            </p>
            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <div>
                  <p className="text-[12px] uppercase tracking-[0.1em] text-[#6b7280]">
                    Name
                  </p>
                  <p className="mt-1 text-[15px] font-semibold text-[#111827]">
                    {order.customer_name}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] uppercase tracking-[0.1em] text-[#6b7280]">
                    Email
                  </p>
                  <p className="mt-1 text-[15px] text-[#374151]">
                    {order.email || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] uppercase tracking-[0.1em] text-[#6b7280]">
                    Phone
                  </p>
                  <p className="mt-1 text-[15px] text-[#374151]">
                    {order.phone_number || "N/A"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-[12px] uppercase tracking-[0.1em] text-[#6b7280]">
                    Street
                  </p>
                  <p className="mt-1 text-[15px] text-[#374151]">
                    {order.shipping_address.street_address || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] uppercase tracking-[0.1em] text-[#6b7280]">
                    Area
                  </p>
                  <p className="mt-1 text-[15px] text-[#374151]">
                    {order.shipping_address.area || "N/A"}
                  </p>
                </div>
                <div>
                  <p className="text-[12px] uppercase tracking-[0.1em] text-[#6b7280]">
                    City / Zip
                  </p>
                  <p className="mt-1 text-[15px] text-[#374151]">
                    {order.shipping_address.city || "N/A"}
                    {order.shipping_address.zip_code
                      ? `, ${order.shipping_address.zip_code}`
                      : ""}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-[#e3e7ee] bg-white p-5">
            <p className="text-[13px] uppercase tracking-[0.2em] text-[#6b7280]">
              Order Summary
            </p>
            <div className="mt-4 grid grid-cols-1 gap-3">
              {summaryItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <span className="text-[13px] text-[#6b7280]">
                    {item.label}
                  </span>
                  <span className="text-[14px] font-semibold text-[#111827]">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* box item section  */}
        <div className="mt-6 rounded-lg border border-[#d9dde3] bg-[#f7f8fa]">
          <div className="border-b border-[#d9dde3] px-4 py-3 text-[15px] font-semibold text-[#111827]">
            Gafbi Box item
          </div>
          {order.items.map((item) => (
            <div key={item.id} className="border-b border-[#d9dde3] px-4 py-3">
              <div className="flex items-center justify-between text-[15px] text-[#165480]">
                <span>{item.product_name}</span>
                <span>{item.quantity}x</span>
              </div>
              <p className="mt-1 text-[13px] text-[#6b7280]">
                Unit price: {item.unit_price}
              </p>
            </div>
          ))}
          <div className="flex items-center justify-between px-4 py-3 text-[15px] font-semibold text-[#111827]">
            <span>Total</span>
            <span>{order.items.length} items</span>
          </div>
        </div>

        {order.status === "approved" && (
          <div className="mt-8 print:hidden">
            <button
              type="button"
              onClick={onConfirmShipment}
              disabled={isConfirming}
              className="rounded-md bg-[#165480] px-4 py-2 text-[14px] font-semibold text-white hover:bg-[#124567] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isConfirming ? "Confirming..." : "Confirm shipment"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
