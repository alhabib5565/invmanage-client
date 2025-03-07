import { tags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: `/products/create-product`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.Product],
    }),

    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/products/upload-product-image`,
        method: "POST",
        body: data,
      }),
    }),

    deleteProductImage: builder.mutation({
      query: (public_id) => ({
        url: `/products/${public_id}/delete-product-image`,
        method: "DELETE",
      }),
    }),

    getAllProducts: builder.query({
      query: () => ({
        url: "/products",
      }),
      providesTags: [tags.Product],
    }),

    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      providesTags: [tags.Product],
    }),
    editProduct: builder.mutation({
      query: ({ data, id }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.Product],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.Product],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useEditProductMutation,
  useGetSingleProductQuery,
  useDeleteProductMutation,
  useUploadProductImageMutation,
  useDeleteProductImageMutation,
} = productApi;
