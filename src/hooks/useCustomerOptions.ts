import { useGetAllCustomersQuery } from "@/redux/api/admin/customerManagement.api";

const useCustomerOptions = () => {
  const { data } = useGetAllCustomersQuery({});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const customerOptions = data?.data.map((customer: any) => ({
    label: customer.name,
    value: customer._id,
  }));

  return { customerOptions };
};

export default useCustomerOptions;
