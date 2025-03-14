import PageHeader from "@/components/shared/PageHeader";
import Loading from "@/components/shared/Loading";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MyPagination from "@/components/myUi/MyPagination";
import { Eye, PenSquare, Trash2 } from "lucide-react";
import { deleteConfirmation } from "@/utils/deleteConfirmation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/api/admin/product.api";
import { TProduct } from "./product.type";
import { Link } from "react-router-dom";
const Products = () => {
  const { data, isLoading } = useGetAllProductsQuery({});
  const [deleteProduct] = useDeleteProductMutation();
  if (isLoading) return <Loading />;
  console.log(data?.data);
  return (
    <div className="space-y-6">
      <PageHeader createBtnPaht="/admin/create-product" />
      <div className="p-6 border rounded-[16px] space-y-4 bg-white">
        <div className="pb-4 flex justify-between items-center gap-4 ">
          <h3 className="flex-grow">All Brands</h3>
          <div className="flex gap-4">
            <Input placeholder="Search..." />
            <Button>Filter</Button>
          </div>
        </div>
        <div className="relative h-fit max-h-[500px] overflow-y-scroll">
          <Table className="border-b">
            <TableHeader className="bg-secondary sticky top-0 z-10 ">
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Cost</TableHead>
                <TableHead>Price</TableHead>

                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((product: TProduct) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <Avatar>
                      <AvatarImage
                        src={product?.images[0]?.secure_url}
                        alt="brand"
                      />
                      <AvatarFallback>
                        {product?.productName?.substring(0, 3)}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <span className="px-3 py-1 rounded bg-[#FDD4DA] text-sm text-[#F62951]">
                      {product.productID}
                    </span>
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {product.productName}
                  </TableCell>
                  <TableCell>{product.brand.name}</TableCell>
                  <TableCell>{product.category.name}</TableCell>

                  <TableCell>
                    <span className="px-3 rounded py-0.5 text-sm font-medium flex items-center gap-2 w-fit text-primary bg-secondary">
                      {product?.createdAt?.split("T")[0]}
                    </span>
                  </TableCell>
                  <TableCell>{product.productCost} TK</TableCell>
                  <TableCell>{product.productPrice} TK</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <button>
                        <Eye className="text-green-500 size-5 stroke-[2.8px]" />
                      </button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-primary"
                        asChild
                      >
                        <Link to={`/admin/edit-product/${product.slug}`}>
                          <PenSquare strokeWidth={2.5} />
                        </Link>
                      </Button>{" "}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-100"
                        onClick={() =>
                          deleteConfirmation(deleteProduct, product.productID)
                        }
                      >
                        <Trash2 strokeWidth={2.8} />
                      </Button>
                    </div>
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

export default Products;
