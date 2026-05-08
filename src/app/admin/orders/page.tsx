/** @format */
"use client";

import React, { useState } from "react";
import OrdersTable from "@/components/AdminComponents/OrdersComponents/OrdersTable";
import OrdersTableSkeleton from "@/components/Skeleton/OrdersTableSkeleton";
import {
  type ShipmentStatus,
  useGetOrdersQuery,
} from "@/redux/features/order/orderApi";

const OrdersPage = () => {
  const [activeStatus, setActiveStatus] = useState<ShipmentStatus>("shipped");
  const { data, isLoading } = useGetOrdersQuery({ status: activeStatus });
  const orders = data?.data ?? [];

  if (isLoading) {
    return (
      <main>
        <OrdersTableSkeleton />
      </main>
    );
  }

  return (
    <main>
      <OrdersTable
        orders={orders}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
      />
    </main>
  );
};

export default OrdersPage;
