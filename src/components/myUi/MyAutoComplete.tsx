/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { TProduct } from "../pages/dashboard/admin/product/product.type";
import { toast } from "sonner";
import { TPurchaseProductItemWithProduct } from "../pages/dashboard/admin/purchase/purchase.type";

type TMyAutoCompleteProps = {
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<TPurchaseProductItemWithProduct[]>
  >;
  data: any[];
  selectedProduct: TPurchaseProductItemWithProduct[];
};

const MyAutoComplete = ({
  inputValue,
  setInputValue,
  setSelectedProduct,
  data,
  selectedProduct,
}: TMyAutoCompleteProps) => {
  const handleInputChage = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleSuggetionClick = (item: TProduct) => {
    setInputValue("");
    const isProductAlreadySelected = selectedProduct.find(
      (product) => product._id === item._id
    );

    if (isProductAlreadySelected) {
      return toast.error("This product already selected");
    } else {
      const totalTax = (item.productPrice / 100) * item.tax;

      console.log(totalTax, item.tax, item.taxType);
      const formatedProductItemData = {
        ...item,
        taxRate: item.tax,
        taxAmount: (item.productPrice / 100) * item.tax,
        discountAmount: 0,
        quantity: 1,

        subTotal:
          item.taxType === "inclusive"
            ? item.productPrice
            : item.productPrice + totalTax,
        netUnitPrice:
          item.taxType === "inclusive"
            ? item.productPrice - item.tax
            : item.productPrice,
      };

      setSelectedProduct((prevItem) => [...prevItem, formatedProductItemData]);
    }
  };

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="search..."
        value={inputValue}
        onChange={handleInputChage}
      />
      {data?.length > 0 && inputValue && (
        <ul className="h-[300px] w-full overflow-y-scroll top-14 absolute bg-white z-50 left-1/2 -translate-x-1/2 rounded-md border">
          {data?.map((item: TProduct) => (
            <li
              onClick={() => handleSuggetionClick(item)}
              className="px-3 py-2 text-[#343A40] font-semibold hover:bg-primary hover:text-white cursor-pointer truncate flex gap-2 items-center"
              key={item._id}
            >
              <Search /> <span>{item.productName}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAutoComplete;
