import Loading from "@/components/shared/Loading";
import PageHeader from "@/components/shared/PageHeader";
import {
  useDeleteWarehouseMutation,
  useGetAllWarehouseQuery,
} from "@/redux/api/admin/warehouse.api";
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
import { TWarehouse } from "./warehouse.type";
import { Eye, PenSquare, Trash2 } from "lucide-react";
import { deleteConfirmation } from "@/utils/deleteConfirmation";
import { Link } from "react-router-dom";
const Warehouse = () => {
  const { data, isLoading } = useGetAllWarehouseQuery({});
  const [deleteWarehouse] = useDeleteWarehouseMutation();
  if (isLoading) return <Loading />;
  return (
    <div className="space-y-6">
      <PageHeader createBtnPaht="/admin/create-warehouse" />
      <div className="p-6 border rounded-[16px] space-y-4 bg-white">
        <div className="pb-4 flex justify-between items-center gap-4 ">
          <h3 className="flex-grow">Our Warehouses</h3>
          <div className="flex gap-4">
            <Input placeholder="Search..." />
            <Button>Filter</Button>
          </div>
        </div>
        <div className="relative h-fit max-h-[500px] overflow-y-scroll">
          <Table className="border-b">
            <TableHeader className="bg-secondary sticky top-0 z-10 ">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Mobile</TableHead>
                <TableHead>Division</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Zip Code</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Created Date</TableHead>

                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((warehouse: TWarehouse) => (
                <TableRow key={warehouse._id}>
                  <TableCell className="flex flex-col gap-1">
                    <span className="text-primary">{warehouse.name}</span>
                    <span>{warehouse.email}</span>
                  </TableCell>
                  <TableCell>{warehouse.mobileNumber}</TableCell>
                  <TableCell>{warehouse.division}</TableCell>
                  <TableCell>{warehouse?.district}</TableCell>
                  <TableCell>{warehouse?.zipCode}</TableCell>
                  <TableCell>{warehouse?.address}</TableCell>
                  <TableCell>
                    <span className="px-3 rounded py-0.5 text-sm font-medium flex items-center gap-2 w-fit text-primary bg-secondary">
                      {warehouse?.createdAt?.split("T")[0]}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3 items-center">
                      <button>
                        <Eye className="text-green-500 size-5 stroke-[2.8px]" />
                      </button>
                      <Link to={`/admin/${warehouse.slug}/edit-warehouse`}>
                        <PenSquare className="text-primary size-5 stroke-[2.8px]" />
                      </Link>
                      <button
                        onClick={() =>
                          deleteConfirmation(deleteWarehouse, warehouse.slug)
                        }
                      >
                        <Trash2 className="text-red-500 size-5 stroke-[2.8px]" />
                      </button>
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

export default Warehouse;
