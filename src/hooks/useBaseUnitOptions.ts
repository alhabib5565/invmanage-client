import { TBaseUnits } from "@/components/pages/dashboard/admin/base-unit/baseUnits.type";
import { useGetAllBaseUnitsQuery } from "@/redux/api/admin/baseUnit.api";

const useBaseUnitOptions = () => {
  const { data } = useGetAllBaseUnitsQuery({});
  const baseUnitOptions = data?.data.map((baseUnit: TBaseUnits) => ({
    value: baseUnit._id,
    label: baseUnit.name,
  }));
  return { baseUnitOptions };
};

export default useBaseUnitOptions;
