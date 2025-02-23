import { tags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const assignedBook = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAssignedBook: builder.query({
      query: (employeeId) => ({
        url: `/emp-assigned-books/${employeeId}/assigned-books-by-employee`,
      }),
      providesTags: [tags.BookSale, tags.EmpBookAssign],
    }),
  }),
});

export const { useGetAllAssignedBookQuery } = assignedBook;
