/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
//@ts-nocheck
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TPurchase, TPurchaseProductItem } from "../purchase/purchase.type";
import { TSales, TSalesItem } from "../sales/sales.type";

type TSearchProps = {
  selectedItem: React.Dispatch<
    React.SetStateAction<TPurchaseProductItem[] | TSalesItem[] | null>
  >;
  setItem_ID: React.Dispatch<React.SetStateAction<string>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  inputValue: string;
  data: TSales[] | TPurchase[];
  isLoading: boolean;
  disabled: boolean;
  placeholder: string;
};

const SalesAndPurchaseSearch = ({
  selectedItem,
  setItem_ID,
  setInputValue,
  inputValue,
  data,
  isLoading,
  disabled,
  placeholder,
}: TSearchProps) => {
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setIsSuggestionOpen(true);
  };

  const handleSuggetionClick = (saleOrPurchase: any) => {
    console.log(saleOrPurchase);
    setInputValue("");
    setItem_ID(saleOrPurchase._id);
    selectedItem(saleOrPurchase?.items);
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
        disabled={disabled}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
      {inputValue && isSuggestionOpen && (
        <div className="top-14 absolute w-full bg-white z-50 left-1/2 -translate-x-1/2 rounded-md border">
          {isLoading ? (
            <p className="px-4 py-2 text-sm text-gray-500">Searching...</p>
          ) : !isLoading && data?.length === 0 ? (
            <p className="px-4 py-2 text-sm text-gray-500">No Data Found</p>
          ) : data?.length > 0 ? (
            <ul className="h-[300px] w-full overflow-y-scroll ">
              {data?.map((item) => (
                <li
                  onClick={() => handleSuggetionClick(item)}
                  className="px-3 py-2 text-[#343A40] font-semibold hover:bg-primary hover:text-white cursor-pointer truncate flex gap-2 items-center"
                  key={item._id}
                >
                  <Search /> <span>{item?.purchaseId || item?.salesId}</span>
                </li>
              ))}
            </ul>
          ) : (
            ""
          )}
        </div>
      )}
    </div>
  );
};

export default SalesAndPurchaseSearch;
