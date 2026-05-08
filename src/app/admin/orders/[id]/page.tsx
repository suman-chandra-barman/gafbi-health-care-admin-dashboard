/** @format */
"use client";

import React from "react";
import { useParams } from "next/navigation";
import OrderDetails from "@/components/AdminComponents/OrdersComponents/OrderDetails";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useConfirmShipmentMutation,
  useGetOrderDetailsQuery,
} from "@/redux/features/order/orderApi";
import { toast } from "react-toastify";

const OrderDetailsPage = () => {
  const params = useParams();
  const orderId = Number(params.id);
  const { data, isLoading } = useGetOrderDetailsQuery(orderId, {
    skip: Number.isNaN(orderId),
  });
  const [confirmShipment, { isLoading: isConfirming }] =
    useConfirmShipmentMutation();

  const handleConfirmShipment = async () => {
    if (Number.isNaN(orderId)) {
      return;
    }
    try {
      await confirmShipment(orderId).unwrap();
      toast.success("Shipment confirmed.");
    } catch {
      toast.error("Failed to confirm shipment.");
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6">
        <div className="space-y-4">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (!data?.data) {
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
      <OrderDetails
        order={data.data}
        onConfirmShipment={handleConfirmShipment}
        isConfirming={isConfirming}
      />
    </div>
  );
};

export default OrderDetailsPage;
