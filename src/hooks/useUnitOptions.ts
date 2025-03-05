import { TUnit } from "@/components/pages/dashboard/admin/unit/unit.type";
import { useGetAllUnitsQuery } from "@/redux/api/admin/unit.api";

const useUnitOptions = (baseUnit_id: string) => {
  const { data } = useGetAllUnitsQuery(
    { baseUnit: baseUnit_id },
    { skip: !baseUnit_id }
  );
  const unitOptions = data?.data.map((unit: TUnit) => ({
    value: unit._id,
    label: unit.name,
  }));
  return { unitOptions };
};

export default useUnitOptions;
