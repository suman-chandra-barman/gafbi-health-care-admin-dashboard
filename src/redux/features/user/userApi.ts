/** @format */
import { baseApi } from "@/redux/api/baseApi";

export interface User {
  id: string;
  user_id: string;
  name: string;
  register_email: string;
  joined: string;
  care_level: string | null;
}

export interface UsersResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: User[];
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<
      UsersResponse,
      { search?: string; page?: number; limit?: number }
    >({
      query: ({ search = "", page = 1, limit = 10 }) => {
        let url = `/care-box/admin-dashboard/users/?page=${page}&limit=${limit}`;
        if (search) {
          url += `&search=${search}`;
        }
        return url;
      },
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
