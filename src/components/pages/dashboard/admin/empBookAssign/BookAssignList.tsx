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
import PageHeader from "@/components/shared/PageHeader";
import Loading from "@/components/shared/Loading";
import { Link } from "react-router-dom";
import { useGetAllEmpBookAssignsQuery } from "@/redux/api/admin/empBookAssign.api";
import { TEmpBookAssign } from "./empBookAssing.type";
import { Edit, Trash2 } from "lucide-react";

const BookAssignList = () => {
  const { data, isLoading } = useGetAllEmpBookAssignsQuery({});

  if (isLoading) {
    return <Loading />;
  }
  console.log(data.data);
  return (
    <div className="space-y-6">
      <PageHeader />
      <div className="p-6 border rounded-[16px] space-y-4">
        <div className="px-6 py-4 flex justify-between items-center gap-4 ">
          <h3 className="flex-grow">Book Assing List</h3>
          <div className="flex gap-4">
            <Input placeholder="Search..." />
            <Button>Filter</Button>
          </div>
        </div>
        <div>
          <Table className="border-b">
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className="w-[100px] text-primary font-medium">
                  ID
                </TableHead>
                <TableHead className="text-primary">Employee Name</TableHead>
                <TableHead className="text-primary">Book Title</TableHead>
                <TableHead className="text-primary font-medium">
                  Assigned Quantity
                </TableHead>
                <TableHead className="text-primary font-medium">
                  Assigned Date
                </TableHead>
                <TableHead className="text-primary font-medium">
                  Unit Price
                </TableHead>
                <TableHead className="text-primary font-medium">
                  Total Price
                </TableHead>

                <TableHead className="text-primary font-medium text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((empBookAssign: TEmpBookAssign) => (
                <TableRow key={empBookAssign._id}>
                  <TableCell>{empBookAssign.assignId}</TableCell>
                  <TableCell>{empBookAssign.employee.employeeName}</TableCell>
                  <TableCell>{empBookAssign.book.bookTitle}</TableCell>
                  <TableCell>{empBookAssign.quantityAssigned}</TableCell>
                  <TableCell>
                    {empBookAssign.assignDate.split("T")[0]}
                  </TableCell>
                  <TableCell>{empBookAssign.pricePerUnit}</TableCell>

                  <TableCell>
                    {empBookAssign.quantityAssigned *
                      empBookAssign.pricePerUnit}{" "}
                    TK
                  </TableCell>
                  <TableCell className="flex gap-4 justify-end">
                    <Link to={`#`}>
                      <Button className="px-3 py-1.5 gap-1 h-fit text-center  text-sm">
                        <Edit size={14} />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      // onClick={() => handleBookDelete(book.bookID)}
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

export default BookAssignList;
