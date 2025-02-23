import { tags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const empBookAssignApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEmpBookAssign: builder.mutation({
      query: (data) => ({
        url: `/emp-assigned-books/create-emp-books-assign`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.EmpBookAssign],
    }),

    editEmpBookAssigns: builder.mutation({
      query: ({ data, id }) => ({
        url: `/emp-assigned-books/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.EmpBookAssign],
    }),

    getAllEmpBookAssigns: builder.query({
      query: () => ({
        url: "/emp-assigned-books",
      }),
      providesTags: [tags.EmpBookAssign],
    }),

    getSingleEmpBookAssigns: builder.query({
      query: (id) => ({
        url: `/emp-assigned-books/${id}`,
      }),
      providesTags: [tags.EmpBookAssign],
    }),
  }),
});

export const {
  useCreateEmpBookAssignMutation,
  useEditEmpBookAssignsMutation,
  useGetAllEmpBookAssignsQuery,
  useGetSingleEmpBookAssignsQuery,
} = empBookAssignApi;
