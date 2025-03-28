import { tags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const purchaseReturnApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPurchaseRetrun: builder.mutation({
      query: (data) => ({
        url: `/purchase-returns/create-purchase-retrun`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.PurchaseRetrun],
    }),

    editPurchaseRetruns: builder.mutation({
      query: ({ data, id }) => ({
        url: `/purchase-returns/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.PurchaseRetrun],
    }),

    getAllPurchaseRetruns: builder.query({
      query: (params) => ({
        url: "/purchase-returns",
        params,
      }),
      providesTags: [tags.PurchaseRetrun],
    }),

    getSinglePurchaseRetruns: builder.query({
      query: (id) => ({
        url: `/purchase-returns/${id}`,
      }),
      providesTags: [tags.PurchaseRetrun],
    }),

    deletePurchaseRetrun: builder.mutation({
      query: (id) => ({
        url: `/purchase-returns/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.PurchaseRetrun],
    }),
  }),
});

export const {
  useCreatePurchaseRetrunMutation,
  useEditPurchaseRetrunsMutation,
  useGetAllPurchaseRetrunsQuery,
  useGetSinglePurchaseRetrunsQuery,
  useDeletePurchaseRetrunMutation,
} = purchaseReturnApi;
