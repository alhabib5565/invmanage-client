import { tags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createEmployee: builder.mutation({
      query: (data) => ({
        url: `/users/create-employee`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.User],
    }),

    editEmployee: builder.mutation({
      query: ({ data, id }) => ({
        url: `/employees/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.User],
    }),

    uploadProfilePhoto: builder.mutation({
      query: ({ data, id }) => ({
        url: `/employees/upload-profile-photo/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.User],
    }),

    getAllEmployee: builder.query({
      query: (queryParams) => ({
        url: "/employees",
        params: queryParams,
      }),
      providesTags: [tags.User],
    }),

    getSingleEmployee: builder.query({
      query: (id) => ({
        url: `/employees/${id}`,
      }),
      providesTags: [tags.User],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.User],
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useEditEmployeeMutation,
  useGetAllEmployeeQuery,
  useGetSingleEmployeeQuery,
  useUploadProfilePhotoMutation,
  useDeleteEmployeeMutation,
} = userApi;
