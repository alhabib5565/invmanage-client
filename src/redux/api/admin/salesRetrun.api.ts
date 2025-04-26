import { tags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const salesReturnApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSalesRetrun: builder.mutation({
      query: (data) => ({
        url: `/sale-returns/create-sale-return`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.SalesRetrun],
    }),

    editSalesRetruns: builder.mutation({
      query: ({ data, id }) => ({
        url: `/sale-returns/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.SalesRetrun],
    }),

    getAllSalesRetruns: builder.query({
      query: (params) => ({
        url: "/sale-returns",
        params,
      }),
      providesTags: [tags.SalesRetrun],
    }),

    getSingleSalesRetruns: builder.query({
      query: (id) => ({
        url: `/sale-returns/${id}`,
      }),
      providesTags: [tags.SalesRetrun],
    }),

    deleteSalesRetrun: builder.mutation({
      query: (id) => ({
        url: `/sale-returns/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.SalesRetrun],
    }),
  }),
});

export const {
  useCreateSalesRetrunMutation,
  useEditSalesRetrunsMutation,
  useGetAllSalesRetrunsQuery,
  useGetSingleSalesRetrunsQuery,
  useDeleteSalesRetrunMutation,
} = salesReturnApi;
