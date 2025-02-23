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
import { useGetAllBookSalesQuery } from "@/redux/api/admin/bookSale.api";
import { TBookSale } from "./adminBookSale.type";
import PaymentModalOpenButton from "@/components/shared/createPayment/PaymentModalOpenButton";
const AdminBookSaleList = () => {
  const { data, isLoading } = useGetAllBookSalesQuery({});

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="space-y-6">
      <PageHeader />
      <div className="p-6 border rounded-[16px] space-y-4">
        <div className="px-6 py-4 flex justify-between items-center gap-4 ">
          <h3 className="flex-grow">Book sale by Admin</h3>
          <div className="flex gap-4">
            <Input placeholder="Search..." />
            <Button>Filter</Button>
          </div>
        </div>
        <div>
          <div className="relative h-[500px] overflow-y-scroll">
            <Table className="border-b">
              <TableHeader className="bg-secondary sticky top-0 z-10 ">
                <TableRow>
                  <TableHead className=" text-primary font-medium">
                    ID
                  </TableHead>
                  <TableHead className="text-primary">Book Title</TableHead>
                  <TableHead className="text-primary font-medium">
                    Sale By
                  </TableHead>
                  <TableHead className="text-primary font-medium">
                    Customer
                  </TableHead>
                  <TableHead className="text-primary font-medium">
                    Date
                  </TableHead>
                  <TableHead className="text-primary font-medium">
                    Quantity
                  </TableHead>
                  <TableHead className="text-primary font-medium">
                    Unit Price
                  </TableHead>
                  <TableHead className="text-primary font-medium">
                    Price
                  </TableHead>
                  <TableHead className="text-primary font-medium">
                    Paid (TK)
                  </TableHead>
                  <TableHead className="text-primary font-medium">
                    Due (TK)
                  </TableHead>

                  <TableHead className="text-primary font-medium text-right">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.data.map((bookSale: TBookSale) => (
                  <TableRow key={bookSale._id}>
                    <TableCell>{bookSale.saleId}</TableCell>
                    <TableCell>{bookSale.book.bookTitle}</TableCell>
                    <TableCell>{bookSale.saleBy.employeeName}</TableCell>
                    <TableCell>{bookSale?.customer?.name}</TableCell>
                    <TableCell>{bookSale.saleDate.split("T")[0]}</TableCell>
                    <TableCell>{bookSale.totalQuantitySold}</TableCell>
                    <TableCell>{bookSale.sellingPricePerUnit} TK</TableCell>

                    <TableCell>{bookSale.totalAmount}TK</TableCell>
                    <TableCell>{bookSale.paidAmount}</TableCell>
                    <TableCell>{bookSale.dueAmount}</TableCell>
                    <TableCell className="flex gap-4 justify-end">
                      <PaymentModalOpenButton
                        sale={bookSale._id}
                        customer_id={bookSale?.customer?._id}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="px-6 py-4 flex justify-end">
          <MyPagination />
        </div>
      </div>
    </div>
  );
};

export default AdminBookSaleList;
