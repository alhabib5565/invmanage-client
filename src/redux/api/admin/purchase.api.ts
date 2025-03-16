import { tags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const purchaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPurchase: builder.mutation({
      query: (data) => ({
        url: `/purchases/create-purchase`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.Purchase],
    }),

    editPurchases: builder.mutation({
      query: ({ data, id }) => ({
        url: `/purchases/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.Purchase],
    }),

    getAllPurchases: builder.query({
      query: () => ({
        url: "/purchases",
      }),
      providesTags: [tags.Purchase],
    }),

    getSinglePurchases: builder.query({
      query: (id) => ({
        url: `/purchases/${id}`,
      }),
      providesTags: [tags.Purchase],
    }),

    deletePurchase: builder.mutation({
      query: (id) => ({
        url: `/purchases/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.Purchase],
    }),
  }),
});

export const {
  useCreatePurchaseMutation,
  useEditPurchasesMutation,
  useGetAllPurchasesQuery,
  useGetSinglePurchasesQuery,
  useDeletePurchaseMutation,
} = purchaseApi;
