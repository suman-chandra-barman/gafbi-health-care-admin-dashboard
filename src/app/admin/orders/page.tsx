/** @format */
"use client";

import React from "react";
import OrdersTable from "@/components/AdminComponents/OrdersComponents/OrdersTable";
import { mockOrders } from "@/data/mockOrders";

const OrdersPage = () => {
  return (
    <div className="">
      <OrdersTable orders={mockOrders} />
    </div>
  );
};

export default OrdersPage;
