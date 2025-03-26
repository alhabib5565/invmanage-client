import { ChangeEvent, useState } from "react";
import { Search } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { TPurchase, TPurchaseProductItem } from "../purchase/purchase.type";
import { useGetAllPurchasesQuery } from "@/redux/api/admin/purchase.api";

type TSearchProps = {
  selectedPurchase: React.Dispatch<
    React.SetStateAction<TPurchaseProductItem[] | null>
  >;
  warehouse: string;
  supplier: string;
};
const PurchaseReturnProductSearch = ({
  warehouse,
  supplier,
  selectedPurchase,
}: TSearchProps) => {
  const [inputValue, setInputValue] = useState("");
  const searchTerm = useDebounce({ value: inputValue });

  const { data } = useGetAllPurchasesQuery(
    { supplier, warehouse, purchaseId: searchTerm },
    {
      skip: !supplier || !warehouse || !searchTerm,
    }
  );
  const handleInputChage = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleSuggetionClick = (items: TPurchaseProductItem[]) => {
    setInputValue("");

    selectedPurchase(items);
  };
  return (
    <div className="relative">
      <Input
        disabled={!warehouse || !supplier}
        type="text"
        placeholder="Search Purchase by purchase ID"
        value={inputValue}
        onChange={handleInputChage}
      />
      {data?.data?.length > 0 && inputValue && (
        <ul className="h-[300px] w-full overflow-y-scroll top-14 absolute bg-white z-50 left-1/2 -translate-x-1/2 rounded-md border">
          {data?.data?.map((item: TPurchase) => (
            <li
              onClick={() => handleSuggetionClick(item.items)}
              className="px-3 py-2 text-[#343A40] font-semibold hover:bg-primary hover:text-white cursor-pointer truncate flex gap-2 items-center"
              key={item._id}
            >
              <Search /> <span>{item.purchaseId}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PurchaseReturnProductSearch;
