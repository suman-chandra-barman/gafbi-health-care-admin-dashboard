/** @format */
import { baseApi } from "@/redux/api/baseApi";

export type ShipmentStatus = "shipped" | "unshipped" | "cancelled";

export interface OrderListItem {
  id: number;
  order_id: string;
  order_date: string;
  customer: string;
  email: string;
  shipping_carrier: string;
  shipment_status: ShipmentStatus;
  status: string;
}

export interface OrderListResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: OrderListItem[];
}

export interface OrderItem {
  id: number;
  product: number;
  product_name: string;
  product_image_url: string;
  quantity: number;
  unit_price: string;
  subtotal: string;
}

export interface OrderDetails {
  id: number;
  order_id: string;
  order_date: string;
  delivery_date: string | null;
  customer_name: string;
  email: string;
  phone_number: string;
  shipping_address: {
    street_address: string;
    area: string;
    city: string;
    zip_code: string;
  };
  total_amount: string;
  status: string;
  shipping_carrier: string | null;
  tracking_number: string | null;
  shipped_quantity: number;
  items: OrderItem[];
}

export interface OrderDetailsResponse {
  success: boolean;
  message: string;
  data: OrderDetails;
}

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<
      OrderListResponse,
      { status: ShipmentStatus; page?: number; limit?: number; search?: string }
    >({
      query: ({ status, page = 1, limit = 10, search = "" }) => {
        let url = `/care-box/admin-dashboard/orders/?status=${status}&page=${page}&limit=${limit}`;
        if (search) {
          url += `&search=${search}`;
        }
        return url;
      },
      providesTags: ["Order"],
    }),
    getOrderDetails: builder.query<OrderDetailsResponse, number>({
      query: (id) => `/care-box/admin-dashboard/orders/${id}/`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),
    confirmShipment: builder.mutation<OrderDetailsResponse, number>({
      query: (id) => ({
        url: `/care-box/admin-dashboard/orders/${id}/confirm-shipment/`,
        method: "POST",
      }),
      invalidatesTags: (result, error, id) => ["Order", { type: "Order", id }],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
  useConfirmShipmentMutation,
} = orderApi;
