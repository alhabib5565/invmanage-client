import { tags } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCustomer: builder.mutation({
      query: (data) => ({
        url: `/users/create-customer`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tags.Customer],
    }),

    getAllCustomers: builder.query({
      query: () => ({
        url: "/customers",
      }),
      providesTags: [tags.Customer],
    }),

    getSingleCustomers: builder.query({
      query: (id) => ({
        url: `/customers/${id}`,
      }),
      providesTags: [tags.Customer],
    }),

    editCustomers: builder.mutation({
      query: ({ data, id }) => ({
        url: `/customers/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tags.Customer],
    }),

    deleteCustomers: builder.mutation({
      query: (id) => ({
        url: `/customers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tags.Customer],
    }),
  }),
});

export const {
  useCreateCustomerMutation,
  useEditCustomersMutation,
  useGetAllCustomersQuery,
  useGetSingleCustomersQuery,
  useDeleteCustomersMutation,
} = customerApi;
