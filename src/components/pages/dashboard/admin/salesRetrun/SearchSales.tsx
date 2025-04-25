import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import useDebounce from "@/hooks/useDebounce";
import { Input } from "@/components/ui/input";
import { TPurchase, TPurchaseProductItem } from "../purchase/purchase.type";
import { useGetAllPurchasesQuery } from "@/redux/api/admin/purchase.api";

type TSearchProps = {
  selectedPurchase: React.Dispatch<
    React.SetStateAction<TPurchaseProductItem[] | null>
  >;
  setPurchase_ID: React.Dispatch<React.SetStateAction<string>>;
  warehouse: string;
  supplier: string;
};
const SearchSales = ({
  warehouse,
  supplier,
  selectedPurchase,
  setPurchase_ID,
}: TSearchProps) => {
  const [inputValue, setInputValue] = useState("");
  const searchTerm = useDebounce({ value: inputValue });
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);

  const { data, isFetching } = useGetAllPurchasesQuery(
    { supplier, warehouse, searchTerm },
    {
      skip: !supplier || !warehouse || !searchTerm,
    }
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setIsSuggestionOpen(true);
  };

  const handleSuggetionClick = (purchase: TPurchase) => {
    setInputValue("");
    setPurchase_ID(purchase._id);
    selectedPurchase(purchase?.items);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(e.target as Node)
      ) {
        setIsSuggestionOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);
  return (
    <div className="relative" ref={suggestionRef}>
      <Input
        disabled={!warehouse || !supplier}
        type="text"
        placeholder="Search Sales by sales ID"
        value={inputValue}
        onChange={handleInputChange}
      />
      {inputValue && isSuggestionOpen && (
        <div className="top-14 absolute w-full bg-white z-50 left-1/2 -translate-x-1/2 rounded-md border">
          {isFetching && (
            <p className="px-4 py-2 text-sm text-gray-500">Searching...</p>
          )}
          {!isFetching && data?.data?.length === 0 && (
            <p className="px-4 py-2 text-sm text-gray-500">No Data Found</p>
          )}

          {data?.data?.length > 0 && (
            <ul className="h-[300px] w-full overflow-y-scroll ">
              {data?.data?.map((item: TPurchase) => (
                <li
                  onClick={() => handleSuggetionClick(item)}
                  className="px-3 py-2 text-[#343A40] font-semibold hover:bg-primary hover:text-white cursor-pointer truncate flex gap-2 items-center"
                  key={item._id}
                >
                  <Search /> <span>{item.purchaseId}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchSales;
