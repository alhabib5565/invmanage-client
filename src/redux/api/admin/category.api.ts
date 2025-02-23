import { tags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: `/categories/create-category`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.Category],
    }),

    getAllCategories: builder.query({
      query: () => ({
        url: "/categories",
      }),
      providesTags: [tags.Category],
    }),

    getSingleCategory: builder.query({
      query: (id) => ({
        url: `/categories/${id}`,
      }),
      providesTags: [tags.Category],
    }),
    editCategory: builder.mutation({
      query: ({ data, id }) => ({
        url: `/categories/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.Category],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.Category],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useEditCategoryMutation,
  useGetSingleCategoryQuery,
  useDeleteCategoryMutation,
} = categoryApi;
