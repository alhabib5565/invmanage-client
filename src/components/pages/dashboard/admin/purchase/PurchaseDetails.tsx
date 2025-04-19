import Loading from "@/components/shared/Loading";
import PageHeader from "@/components/shared/PageHeader";
import { useGetSinglePurchasesQuery } from "@/redux/api/admin/purchase.api";
import { Mail, MapPin, Phone, User } from "lucide-react";
import { useParams } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TPurchaseProductItem } from "./purchase.type";

const PurchaseDetails = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetSinglePurchasesQuery(id);
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="space-y-6">
      <PageHeader isBack />
      <div className="bg-white p-4 rounded-md space-y-6">
        <h3 className="font-bold text-[16px] text-center">
          Purchase Details: {id}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4">
          <div>
            <h4 className="bg-gray-100 px-4 py-3 font-medium text-gray-700">
              Purchase
            </h4>
          </div>
          <div>
            <h4 className="bg-gray-100 px-4 py-3 font-medium text-gray-700">
              Supllier
            </h4>
            <div className="px-4 py-3 space-y-3">
              <p className="flex gap-2 items-center">
                <User className="size-5 text-primary " />
                <span className="text-[16px]">Md Al-Habib</span>
              </p>
              <p className="flex gap-2 items-center">
                <Mail className="size-5 text-primary " />
                <span className="text-[16px]">habib@gmail.com</span>
              </p>
              <p className="flex gap-2 items-center">
                <Phone className="size-5 text-primary " />
                <span className="text-[16px]">01405*******</span>
              </p>
              <p className="flex gap-2 items-center">
                <MapPin className="size-5 text-primary " />
                <span className="text-[16px]">Mymenshinng, Sherpur</span>
              </p>
            </div>
          </div>
          <div>
            <h4 className="bg-gray-100 px-4 py-3 font-medium text-gray-700">
              Customer
            </h4>
          </div>
        </div>

        <div>
          <h4 className="bg-gray-100 px-4 py-3 font-medium text-gray-700">
            Order Summery
          </h4>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Net Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Tax</TableHead>
                <TableHead>Sub Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.items.map((item: TPurchaseProductItem) => (
                <TableRow key={item.product}>
                  <TableCell>{item.productName}</TableCell>

                  <TableCell>{item.netUnitPrice} TK</TableCell>
                  <TableCell>{item.quantity}</TableCell>

                  <TableCell>
                    {item.discountAmount}
                    TK
                  </TableCell>

                  <TableCell>{item.taxAmount} TK</TableCell>
                  <TableCell>{item.subTotal}TK</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetails;
