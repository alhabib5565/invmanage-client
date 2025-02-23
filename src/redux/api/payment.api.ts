import { tags } from "@/redux/tag-types";
import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPayment: builder.mutation({
      query: (data) => ({
        url: `/payments/create-payment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.Payment, tags.Customer, tags.BookSale],
    }),

    getAllPayments: builder.query({
      query: () => ({
        url: "/payments",
      }),
      providesTags: [tags.Payment],
    }),

    getSinglePayments: builder.query({
      query: (id) => ({
        url: `/payments/${id}`,
      }),
      providesTags: [tags.Payment],
    }),
    editPayments: builder.mutation({
      query: ({ data, id }) => ({
        url: `/payments/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.Payment],
    }),
    deletePayment: builder.mutation({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.Payment],
    }),
  }),
});

export const {
  useCreatePaymentMutation,
  useGetAllPaymentsQuery,
  useEditPaymentsMutation,
  useGetSinglePaymentsQuery,
  useDeletePaymentMutation,
} = paymentApi;
