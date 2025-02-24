import { tags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const baseUnitApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBaseUnit: builder.mutation({
      query: (data) => ({
        url: `/base-units/create-base-unit`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.BaseUnit],
    }),

    getAllBaseUnits: builder.query({
      query: () => ({
        url: "/base-units",
      }),
      providesTags: [tags.BaseUnit],
    }),

    getSingleBaseUnit: builder.query({
      query: (id) => ({
        url: `/base-units/${id}`,
      }),
      providesTags: [tags.BaseUnit],
    }),
    editBaseUnit: builder.mutation({
      query: ({ data, id }) => ({
        url: `/base-units/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.BaseUnit],
    }),
    deleteBaseUnit: builder.mutation({
      query: (id) => ({
        url: `/base-units/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.BaseUnit],
    }),
  }),
});

export const {
  useCreateBaseUnitMutation,
  useGetAllBaseUnitsQuery,
  useEditBaseUnitMutation,
  useGetSingleBaseUnitQuery,
  useDeleteBaseUnitMutation,
} = baseUnitApi;
