import { TBrand } from "@/components/pages/dashboard/admin/brand/brand.type";
import { useGetAllBrandsQuery } from "@/redux/api/admin/brand.api";

const useBrandOption = () => {
  const { data } = useGetAllBrandsQuery({});
  const brandOptions = data?.data.map((brand: TBrand) => ({
    value: brand._id,
    label: brand.name,
  }));
  return { brandOptions };
};

export default useBrandOption;
