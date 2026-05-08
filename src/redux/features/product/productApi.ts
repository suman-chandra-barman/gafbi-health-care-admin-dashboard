/** @format */
import { baseApi } from "@/redux/api/baseApi";

export interface Product {
  id: number;
  image_url: string;
  product_id: string;
  name: string;
  price: string;
  quantity: string;
  unit: string;
  quantity_with_unit: string;
  description: string;
  is_active: boolean;
  average_rating: number;
  total_reviews: number;
  created_at: string;
}

export interface ProductListResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: Product[];
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data: Product;
}

export interface ProductDeleteResponse {
  success: boolean;
  message: string;
  data: null;
}

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      ProductListResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) =>
        `/products/?page=${page}&limit=${limit}`,
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation<ProductResponse, FormData>({
      query: (body) => ({
        url: "/products/admin/create/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation<
      ProductResponse,
      { id: number; body: FormData }
    >({
      query: ({ id, body }) => ({
        url: `/products/admin/${id}/update/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Product",
        { type: "Product", id },
      ],
    }),
    deleteProduct: builder.mutation<ProductDeleteResponse, number>({
      query: (id) => ({
        url: `/products/admin/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "Product",
        { type: "Product", id },
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
