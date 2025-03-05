import { TCategory } from "@/components/pages/dashboard/admin/category/category.type";
import { useGetAllCategoriesQuery } from "@/redux/api/admin/category.api";

const useCategoryOptions = () => {
  const { data } = useGetAllCategoriesQuery({});
  const categoryOptions = data?.data.map((category: TCategory) => ({
    value: category._id,
    label: category.name,
  }));
  return { categoryOptions };
};

export default useCategoryOptions;
