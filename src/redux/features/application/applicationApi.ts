/** @format */
import { baseApi } from "@/redux/api/baseApi";

export interface ApplicationListItem {
  id: number;
  application_date: string;
  customer: string;
  email: string;
  status: string;
}

export interface ApplicationListResponse {
  success: boolean;
  message: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: ApplicationListItem[];
}

export interface ApplicationDetails {
  id: number;
  customer: string;
  status: string;
  admin_note: string | null;
  gender: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  level_of_care: number;
  street_address: string;
  area: string;
  city: string;
  zip_code: string;
  different_delivery_address: boolean;
  delivery_street_address: string | null;
  delivery_area: string | null;
  delivery_city: string | null;
  delivery_zip_code: string | null;
  email: string;
  phone_number: string;
  consultation_answer: string;
  consultation_reason: string;
  already_provided_with_care_aids: boolean;
  insurance_type: string;
  insurance_name: string;
  insurance_number: string;
  signature: string;
  signed_cost_assumption: boolean;
  signed_supplier_change: boolean;
  total_amount: string;
  application_month: string;
  created_at: string;
  items: Array<{
    id: number;
    product: number;
    product_name: string;
    product_image_url: string;
    quantity: number;
    unit_price: string;
    subtotal: string;
  }>;
}

export interface ApplicationDetailsResponse {
  success: boolean;
  message: string;
  data: ApplicationDetails;
}

export interface ApplicationDecisionRequest {
  status: "approved" | "rejected";
  admin_note: string;
}

export interface ApplicationDecisionResponse {
  success: boolean;
  message: string;
  data: ApplicationDetails;
}

export const applicationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getApplications: builder.query<
      ApplicationListResponse,
      { search?: string; page?: number; limit?: number }
    >({
      query: ({ search = "", page = 1, limit = 10 }) => {
        let url = `/care-box/admin-dashboard/applications/?page=${page}&limit=${limit}`;
        if (search) {
          url += `&search=${search}`;
        }
        return url;
      },
      providesTags: ["Application"],
    }),
    getApplicationDetails: builder.query<ApplicationDetailsResponse, number>({
      query: (id) => `/care-box/admin-dashboard/applications/${id}/`,
      providesTags: (result, error, id) => [{ type: "Application", id }],
    }),
    decideApplication: builder.mutation<
      ApplicationDecisionResponse,
      { id: number; body: ApplicationDecisionRequest }
    >({
      query: ({ id, body }) => ({
        url: `/care-box/admin-dashboard/applications/${id}/decision/`,
        method: "POST",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Application",
        { type: "Application", id },
      ],
    }),
  }),
});

export const {
  useGetApplicationsQuery,
  useGetApplicationDetailsQuery,
  useDecideApplicationMutation,
} = applicationApi;
