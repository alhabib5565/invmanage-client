import { tags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBrand: builder.mutation({
      query: (data) => ({
        url: `/brands/create-brand`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.Brand],
    }),

    getAllBrands: builder.query({
      query: () => ({
        url: "/brands",
      }),
      providesTags: [tags.Brand],
    }),

    getSingleBrand: builder.query({
      query: (id) => ({
        url: `/brands/${id}`,
      }),
      providesTags: [tags.Brand],
    }),
    editBrand: builder.mutation({
      query: ({ data, id }) => ({
        url: `/brands/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.Brand],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brands/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.Brand],
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useGetAllBrandsQuery,
  useEditBrandMutation,
  useGetSingleBrandQuery,
  useDeleteBrandMutation,
} = brandApi;
