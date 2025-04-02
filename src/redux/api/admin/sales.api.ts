import { tags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const salesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSale: builder.mutation({
      query: (data) => ({
        url: `/sales/create-sales`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.Sales],
    }),

    editSales: builder.mutation({
      query: ({ data, id }) => ({
        url: `/sales/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.Sales],
    }),

    getAllSales: builder.query({
      query: (params) => ({
        url: "/sales",
        params,
      }),
      providesTags: [tags.Sales],
    }),

    getSingleSales: builder.query({
      query: (id) => ({
        url: `/sales/${id}`,
      }),
      providesTags: [tags.Sales],
    }),

    deleteSale: builder.mutation({
      query: (id) => ({
        url: `/sales/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.Sales],
    }),
  }),
});

export const {
  useCreateSaleMutation,
  useEditSalesMutation,
  useGetAllSalesQuery,
  useGetSingleSalesQuery,
  useDeleteSaleMutation,
} = salesApi;
