import { tags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const bookSaleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBookSale: builder.mutation({
      query: (data) => ({
        url: `/book-sales/create-book-sale`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.BookSale],
    }),

    editBookSales: builder.mutation({
      query: ({ data, id }) => ({
        url: `/book-sales/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.BookSale],
    }),

    getAllBookSales: builder.query({
      query: (queryParams) => ({
        url: "/book-sales",
        params: queryParams,
      }),
      providesTags: [tags.BookSale],
    }),

    getSingleBookSales: builder.query({
      query: (id) => ({
        url: `/book-sales/${id}`,
      }),
      providesTags: [tags.BookSale],
    }),

    deleteBookSales: builder.mutation({
      query: (id) => ({
        url: `/book-sales/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.BookSale],
    }),
  }),
});

export const {
  useCreateBookSaleMutation,
  useEditBookSalesMutation,
  useGetAllBookSalesQuery,
  useGetSingleBookSalesQuery,
  useDeleteBookSalesMutation,
} = bookSaleApi;
