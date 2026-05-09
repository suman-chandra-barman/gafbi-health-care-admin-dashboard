/** @format */
import { baseApi } from "@/redux/api/baseApi";

export interface ContactMessage {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  telephone_number: string;
  regarding: string;
  news: string;
  is_read: boolean;
  created_at: string;
}

export interface ContactListResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: ContactMessage[];
}

export interface ContactDeleteResponse {
  success: boolean;
  message: string;
  data: null;
}

export const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query<
      ContactListResponse,
      { page?: number; limit?: number }
    >({
      query: ({ page = 1, limit = 10 }) =>
        `/contacts/admin/?page=${page}&limit=${limit}`,
      providesTags: ["Contact"],
    }),
    deleteContact: builder.mutation<ContactDeleteResponse, number>({
      query: (id) => ({
        url: `/contacts/admin/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        "Contact",
        { type: "Contact", id },
      ],
    }),
  }),
});

export const { useGetContactsQuery, useDeleteContactMutation } = contactApi;
