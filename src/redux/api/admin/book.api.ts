import { tags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBook: builder.mutation({
      query: (data) => ({
        url: `/books/create-book`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.Book],
    }),

    getAllBooks: builder.query({
      query: () => ({
        url: "/books",
      }),
      providesTags: [tags.Book],
    }),

    getBookStock: builder.query({
      query: () => ({
        url: "/books/stock/get-book-stock",
      }),
      providesTags: [tags.Book, tags.BookPurchase, tags.BookSale],
    }),

    getSingleBooks: builder.query({
      query: (id) => ({
        url: `/books/${id}`,
      }),
      providesTags: [tags.Book],
    }),
    editBooks: builder.mutation({
      query: ({ data, id }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.Book],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.Book],
    }),
  }),
});

export const {
  useCreateBookMutation,
  useGetAllBooksQuery,
  useGetBookStockQuery,
  useEditBooksMutation,
  useGetSingleBooksQuery,
  useDeleteBookMutation,
} = bookApi;
