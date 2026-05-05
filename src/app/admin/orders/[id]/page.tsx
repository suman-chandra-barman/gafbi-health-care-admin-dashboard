/** @format */
"use client";

import React from "react";
import { useParams } from "next/navigation";
import OrderDetails from "@/components/AdminComponents/OrdersComponents/OrderDetails";
import { mockOrders } from "@/data/mockOrders";

const OrderDetailsPage = () => {
  const params = useParams();
  const orderId = params.id as string;

  const order = mockOrders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <div className="p-4 sm:p-6">
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold text-foreground">
            Order not found
          </h2>
          <p className="text-muted-foreground mt-2">
            The order you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <OrderDetails order={order} />
    </div>
  );
};

export default OrderDetailsPage;
