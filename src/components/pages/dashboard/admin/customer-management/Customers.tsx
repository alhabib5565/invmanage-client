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
import { Edit, Trash2 } from "lucide-react";
import {
  useDeleteCustomersMutation,
  useGetAllCustomersQuery,
} from "@/redux/api/admin/customerManagement.api";
import { TCustomer } from "./customer.type";
import Swal from "sweetalert2";
import PaymentModalOpenButton from "@/components/shared/createPayment/PaymentModalOpenButton";
import { useState } from "react";
import CreateCustomerModal from "../admin-book-sale/CreateCustomerModal";

const Customers = () => {
  const { data, isLoading } = useGetAllCustomersQuery({});
  const [deleteCustomer] = useDeleteCustomersMutation();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
        const res = await deleteCustomer(id).unwrap();
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
      <div className="flex justify-between items-end">
        <PageHeader />
        <Button type="button" onClick={() => setIsOpen(!isOpen)}>
          Create new Customer
        </Button>
      </div>
      {isOpen && <CreateCustomerModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      <div className="p-6 border rounded-[16px] space-y-4">
        <div className="px-6 py-4 flex justify-between items-center gap-4 ">
          <h3 className="flex-grow">Employees</h3>
          <div className="flex gap-4">
            <Input placeholder="Search..." />
            <Button>Filter</Button>
          </div>
        </div>
        <div>
          <Table className="border-b relative">
            <TableHeader className="bg-secondary">
              <TableRow>
                <TableHead className="w-[100px] text-primary font-medium">
                  User ID
                </TableHead>
                <TableHead className="text-primary">Name</TableHead>
                <TableHead className="text-primary font-medium">
                  Mobile
                </TableHead>
                <TableHead className="text-primary font-medium">
                  Email
                </TableHead>
                <TableHead className="text-primary font-medium">
                  Company Name
                </TableHead>
                <TableHead className="text-primary font-medium">
                  Total Cost
                </TableHead>
                <TableHead className="text-primary font-medium">
                  Total Paid
                </TableHead>
                <TableHead className="text-primary font-medium">
                  Total Due
                </TableHead>

                <TableHead className="text-primary font-medium text-right">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((customer: TCustomer) => (
                <TableRow key={customer._id}>
                  <TableCell>{customer.customerID}</TableCell>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell>{customer.mobileNumber}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.companyName}</TableCell>
                  <TableCell>{customer.totalPurchased}</TableCell>
                  <TableCell>{customer.totalPaid}</TableCell>
                  <TableCell>{customer.totalDue}</TableCell>

                  <TableCell className="flex gap-2 justify-end">
                    <PaymentModalOpenButton customer_id={customer._id} />
                    <Link to={"#"}>
                      <Button className="px-3 py-1.5 gap-1 h-fit text-center  text-sm">
                        <Edit size={14} />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleDelete(customer.customerID)}
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

export default Customers;
