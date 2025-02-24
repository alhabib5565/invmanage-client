import { tags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const unitApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUnit: builder.mutation({
      query: (data) => ({
        url: `/units/create-unit`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.Unit],
    }),

    getAllBrands: builder.query({
      query: () => ({
        url: "/units",
      }),
      providesTags: [tags.Unit],
    }),

    getSingleUnit: builder.query({
      query: (id) => ({
        url: `/units/${id}`,
      }),
      providesTags: [tags.Unit],
    }),
    editUnit: builder.mutation({
      query: ({ data, id }) => ({
        url: `/units/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.Unit],
    }),
    deleteUnit: builder.mutation({
      query: (id) => ({
        url: `/units/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.Unit],
    }),
  }),
});

export const {
  useCreateUnitMutation,
  useGetAllBrandsQuery,
  useEditUnitMutation,
  useGetSingleUnitQuery,
  useDeleteUnitMutation,
} = unitApi;
