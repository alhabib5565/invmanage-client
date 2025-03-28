import PageHeader from "@/components/shared/PageHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MyPagination from "@/components/myUi/MyPagination";
import { Link } from "react-router-dom";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/redux/api/admin/category.api";
import Loading from "@/components/shared/Loading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TCategory } from "./category.type";
const Categories = () => {
  const { data, isLoading } = useGetAllCategoriesQuery({});
  const [deleteProduct] = useDeleteCategoryMutation();

  if (isLoading) return <Loading />;
  console.log(data);
  const handleDelete = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteProduct(id).unwrap();
        Swal.fire({
          title: "Deleted!",
          text: res.message || "Deleted successfully.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
    });
  };
  return (
    <div className="space-y-6">
      <PageHeader createBtnPaht="/admin/create-category" />
      <div className="p-6 border rounded-[16px] space-y-4">
        <div className="flex justify-between items-center gap-4 ">
          <h3 className="flex-grow">Categories</h3>
          <div className="flex gap-4">
            <Input placeholder="Search..." />
            <Button>Filter</Button>
          </div>
        </div>
        <div className="relative h-fit max-h-[500px] overflow-y-scroll">
          <Table className="border-b">
            <TableHeader className="bg-secondary sticky top-0 z-10">
              <TableRow>
                <TableHead className=" text-primary font-medium">
                  Slug
                </TableHead>
                <TableHead className="text-primary">Name</TableHead>
                <TableHead className="text-primary">Description</TableHead>
                <TableHead className="text-primary">Product Count</TableHead>

                <TableHead className="text-primary font-medium text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((category: TCategory) => (
                <TableRow key={category._id}>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>{category.description}</TableCell>
                  <TableCell>{category.productCount}</TableCell>

                  <TableCell className="flex gap-4 justify-end">
                    <Link to={`/admin/${category.slug}/edit-category`}>
                      <Button className="px-3 py-1.5 gap-1 h-fit text-center  text-sm">
                        <Edit size={14} />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleDelete(category.slug)}
                      className="px-3 py-1.5 gap-1 bg-red-600 hover:bg-red-500 h-fit text-sm"
                    >
                      <Trash2 size={14} />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="px-6 py-4 flex justify-end">
          <MyPagination />
        </div>
      </div>
    </div>
  );
};

export default Categories;
