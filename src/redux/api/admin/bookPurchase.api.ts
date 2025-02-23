import { tags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const bookPurchaseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBookPurchase: builder.mutation({
      query: (data) => ({
        url: `/book-purchases/create-book-purchase`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.BookPurchase],
    }),

    editBookPurchases: builder.mutation({
      query: ({ data, id }) => ({
        url: `/book-purchases/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.BookPurchase],
    }),

    getAllBookPurchases: builder.query({
      query: () => ({
        url: "/book-purchases",
      }),
      providesTags: [tags.BookPurchase],
    }),

    getSingleBookPurchases: builder.query({
      query: (id) => ({
        url: `/book-purchases/${id}`,
      }),
      providesTags: [tags.BookPurchase],
    }),

    deleteBookPurchase: builder.mutation({
      query: (id) => ({
        url: `/book-purchases/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.BookPurchase],
    }),
  }),
});

export const {
  useCreateBookPurchaseMutation,
  useEditBookPurchasesMutation,
  useGetAllBookPurchasesQuery,
  useGetSingleBookPurchasesQuery,
  useDeleteBookPurchaseMutation,
} = bookPurchaseApi;
