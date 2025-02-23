import Loading from "@/components/shared/Loading";
import {
  useDeleteBookMutation,
  useGetAllBooksQuery,
} from "@/redux/api/admin/book.api";

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
import { Link } from "react-router-dom";
import { TBook } from "./book.type";
import { Edit, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const BookList = () => {
  const { data, isLoading } = useGetAllBooksQuery({});
  const [deleteBook] = useDeleteBookMutation();

  if (isLoading) return <Loading />;

  const handleBookDelete = (id: string) => {
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
        const res = await deleteBook(id).unwrap();
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
          <h3 className="flex-grow">Our All Books</h3>
          <div className="flex gap-4">
            <Input placeholder="Search..." />
            <Button>Filter</Button>
          </div>
        </div>
        <div>
          <Table className="border-b">
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className=" text-primary font-medium">
                  Book ID
                </TableHead>
                <TableHead className="text-primary">Book Title</TableHead>

                <TableHead className="text-primary font-medium text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((book: TBook) => (
                <TableRow key={book._id}>
                  <TableCell>{book.bookID}</TableCell>
                  <TableCell>{book.bookTitle}</TableCell>

                  <TableCell className="flex gap-4 justify-end">
                    <Link to={`/admin/${book.bookID}/edit-book`}>
                      <Button className="px-3 py-1.5 gap-1 h-fit text-center  text-sm">
                        <Edit size={14} />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleBookDelete(book.bookID)}
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

export default BookList;
