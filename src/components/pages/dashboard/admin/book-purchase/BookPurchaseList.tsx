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
import {
  useDeleteBookPurchaseMutation,
  useGetAllBookPurchasesQuery,
} from "@/redux/api/admin/bookPurchase.api";
import Loading from "@/components/shared/Loading";
import { Link } from "react-router-dom";
import { TBookPurchase } from "./bookPurchase.type";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const BookPurchaseList = () => {
  const { data, isLoading } = useGetAllBookPurchasesQuery({});
  const [deletePurchase] = useDeleteBookPurchaseMutation();

  if (isLoading) return <Loading />;

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
        const res = await deletePurchase(id).unwrap();
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
      <PageHeader />
      <div className="p-6 border rounded-[16px] space-y-4">
        <div className="px-6 py-4 flex justify-between items-center gap-4 ">
          <h3 className="flex-grow">Employees</h3>
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
                  Purchase ID
                </TableHead>
                <TableHead className="text-primary">Book Title</TableHead>
                <TableHead className="text-primary font-medium">
                  Quantity
                </TableHead>
                <TableHead className="text-primary font-medium">
                  Purchased Date
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
              {data?.data.map((bookPurchase: TBookPurchase) => (
                <TableRow key={bookPurchase._id}>
                  <TableCell>{bookPurchase.parchaseBookId}</TableCell>
                  <TableCell>{bookPurchase?.book?.bookTitle}</TableCell>
                  <TableCell>{bookPurchase.quantityPurchased}</TableCell>
                  <TableCell>
                    {bookPurchase.purchaseDate.split("T")[0]}
                  </TableCell>
                  <TableCell>{bookPurchase.purchasePricePerUnit}</TableCell>

                  <TableCell>
                    {bookPurchase.quantityPurchased *
                      bookPurchase.purchasePricePerUnit}{" "}
                    TK
                  </TableCell>
                  <TableCell className="flex gap-4 justify-end">
                    <Link
                      // to={`/admin/${bookPurchase.parchaseBookId}/edit-book`}
                      to={"#"}
                    >
                      <Button
                        disabled
                        className="px-3 py-1.5 gap-1 h-fit text-center  text-sm"
                      >
                        <Edit size={14} />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleDelete(bookPurchase.parchaseBookId)}
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

export default BookPurchaseList;
