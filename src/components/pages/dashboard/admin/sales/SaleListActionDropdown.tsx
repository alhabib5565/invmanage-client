import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import { TSales } from "./sales.type";
import { Link } from "react-router-dom";
import PaymentModalOpenButton from "@/components/shared/createPayment/PaymentModalOpenButton";
import { deleteConfirmation } from "@/utils/deleteConfirmation";
import { useDeleteSaleMutation } from "@/redux/api/admin/sales.api";

const SaleListActionDropdown = ({ salesData }: { salesData: TSales }) => {
  const [deletePurchase] = useDeleteSaleMutation();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="px-0 py-0 hover:bg-slate-100 h-8 w-8"
          >
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40 p-2 space-y-2">
          {/* view item */}
          <DropdownMenuItem asChild className="cursor-pointer text-[.975rem]">
            <Link
              to={`/admin/${salesData.salesId}/sale-details`}
              className="flex items-center"
            >
              <Eye strokeWidth={2.5} className="mr-2 size-4" />
              <span>View Sale</span>
            </Link>
          </DropdownMenuItem>
          {/* delete */}
          <DropdownMenuItem
            asChild
            onClick={() =>
              deleteConfirmation(deletePurchase, salesData.salesId)
            }
            className="cursor-pointer text-[.975rem]"
          >
            <button className="flex items-center w-full">
              <Trash2 strokeWidth={2.5} className="mr-2 size-4" />
              <span>Delete</span>
            </button>
          </DropdownMenuItem>
          {/* edit */}
          <DropdownMenuItem asChild className="cursor-pointer text-[.975rem]">
            <Link
              to={`/admin/${salesData.salesId}/edit-sales`}
              className="flex items-center"
            >
              <Edit strokeWidth={2.5} className="mr-2 size-4" />
              <span>Edit</span>
            </Link>
          </DropdownMenuItem>
          <PaymentModalOpenButton
            sale={salesData._id}
            customer_id={salesData?.customer?._id}
            className="w-full"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SaleListActionDropdown;
