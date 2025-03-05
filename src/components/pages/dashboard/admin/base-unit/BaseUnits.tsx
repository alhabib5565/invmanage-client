import PageHeader from "@/components/shared/PageHeader";
import CreateBaseUnitModal from "./CreateBaseUnitModal";
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
import { Trash2 } from "lucide-react";
import { deleteConfirmation } from "@/utils/deleteConfirmation";
import {
  useDeleteBaseUnitMutation,
  useGetAllBaseUnitsQuery,
} from "@/redux/api/admin/baseUnit.api";
import { TBaseUnits } from "./baseUnits.type";
import EditBaseUnitModal from "./EditBaseUnitModal";
const BaseUnits = () => {
  const { data, isLoading } = useGetAllBaseUnitsQuery({});
  const [deleteBaseUnit] = useDeleteBaseUnitMutation();
  if (isLoading) return <Loading />;
  console.log(data);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <PageHeader />
        <CreateBaseUnitModal />
      </div>
      <div className="p-6 border rounded-[16px] space-y-4 bg-white">
        <div className="pb-4 flex justify-between items-center gap-4 ">
          <h3 className="flex-grow">Base Units</h3>
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
                <TableHead>Created Date</TableHead>
                <TableHead>Description</TableHead>

                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((baseUnit: TBaseUnits) => (
                <TableRow key={baseUnit._id}>
                  <TableCell>{baseUnit.name}</TableCell>

                  <TableCell>
                    <span className="px-3 rounded py-0.5 text-sm font-medium flex items-center gap-2 w-fit text-primary bg-secondary">
                      {baseUnit?.createdAt?.split("T")[0]}
                    </span>
                  </TableCell>
                  <TableCell>{baseUnit.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      {/* <button>
                        <Eye className="text-green-500 size-5 stroke-[2.8px]" />
                      </button> */}
                      <EditBaseUnitModal id={baseUnit.slug} />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-500 hover:text-red-600 hover:bg-red-100"
                        onClick={() =>
                          deleteConfirmation(deleteBaseUnit, baseUnit.slug)
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

export default BaseUnits;
