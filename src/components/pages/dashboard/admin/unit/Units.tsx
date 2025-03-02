import PageHeader from "@/components/shared/PageHeader";
import CreateUnitModal from "./CreateUnitModal";

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
import { Trash2 } from "lucide-react";
import { deleteConfirmation } from "@/utils/deleteConfirmation";
import {
  useDeleteUnitMutation,
  useGetAllUnitsQuery,
} from "@/redux/api/admin/unit.api";
import Loading from "@/components/shared/Loading";
import { TUnit } from "./unit.type";
import EditUnitModal from "./EditUnitModal";

const Units = () => {
  const { data, isLoading } = useGetAllUnitsQuery({});
  const [deleteUnit] = useDeleteUnitMutation();
  if (isLoading) return <Loading />;
  console.log(data);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <PageHeader />
        <CreateUnitModal />
      </div>
      <div className="p-6 border rounded-[16px] space-y-4 bg-white">
        <div className="pb-4 flex justify-between items-center gap-4 ">
          <h3 className="flex-grow">Our Warehouses</h3>
          <div className="flex gap-4">
            <Input placeholder="Search..." />
          </div>
        </div>
        <div className="relative h-fit max-h-[500px] overflow-y-scroll">
          <Table className="border-b">
            <TableHeader className="bg-secondary sticky top-0 z-10 ">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Base Unit</TableHead>
                <TableHead>Operator</TableHead>
                <TableHead>Convertion Ratio</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Description</TableHead>

                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((unit: TUnit) => (
                <TableRow key={unit._id}>
                  <TableCell>{unit?.name}</TableCell>
                  <TableCell>{unit.baseUnit?.name}</TableCell>
                  <TableCell>
                    {unit.operator === "*" ? "Multiply(*)" : "Divide(/)"}
                  </TableCell>
                  <TableCell>{unit.conversionRatio}</TableCell>

                  <TableCell>
                    <span className="px-3 rounded py-0.5 text-sm font-medium flex items-center gap-2 w-fit text-primary bg-secondary">
                      {unit?.createdAt?.split("T")[0]}
                    </span>
                  </TableCell>
                  <TableCell>{unit.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <EditUnitModal id={unit.slug} />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-100"
                        onClick={() =>
                          deleteConfirmation(deleteUnit, unit.slug)
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

export default Units;
