import { tags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const warehouseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createWarehouse: builder.mutation({
      query: (data) => ({
        url: `/warehouse/create-warehouse`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.Warehouse],
    }),

    getAllWarehouse: builder.query({
      query: () => ({
        url: "/warehouse",
      }),
      providesTags: [tags.Warehouse],
    }),

    getSingleWarehouse: builder.query({
      query: (id) => ({
        url: `/warehouse/${id}`,
      }),
      providesTags: [tags.Warehouse],
    }),
    editWarehouse: builder.mutation({
      query: ({ data, id }) => ({
        url: `/warehouse/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.Warehouse],
    }),
    deleteWarehouse: builder.mutation({
      query: (id) => ({
        url: `/warehouse/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.Warehouse],
    }),
  }),
});

export const {
  useCreateWarehouseMutation,
  useGetAllWarehouseQuery,
  useEditWarehouseMutation,
  useGetSingleWarehouseQuery,
  useDeleteWarehouseMutation,
} = warehouseApi;
