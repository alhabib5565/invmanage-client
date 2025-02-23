import { tags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const adminReportApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboardSummary: builder.query({
      query: (queryParams) => ({
        url: "/dashboard-overview/summary",
        params: queryParams,
      }),
      providesTags: [tags.BookSale, tags.Payment, tags.Customer],
    }),
  }),
});

export const { useGetAdminDashboardSummaryQuery } = adminReportApi;
