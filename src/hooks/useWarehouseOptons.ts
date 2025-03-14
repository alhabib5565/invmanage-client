import { TWarehouse } from "@/components/pages/dashboard/admin/warehouse/warehouse.type";
import { useGetAllWarehouseQuery } from "@/redux/api/admin/warehouse.api";

const useWarehouseOptions = () => {
  const { data } = useGetAllWarehouseQuery({});
  const warehouseOptions = data?.data.map((warehouse: TWarehouse) => ({
    value: warehouse._id,
    label: warehouse.name,
  }));
  return { warehouseOptions };
};

export default useWarehouseOptions;
