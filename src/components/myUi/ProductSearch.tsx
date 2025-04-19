/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { TProduct } from "../pages/dashboard/admin/product/product.type";
import { toast } from "sonner";
import { TProductItemWithQuanity } from "../pages/dashboard/admin/purchase/purchase.type";
import useDebounce from "@/hooks/useDebounce";
import { useGetAllProductsQuery } from "@/redux/api/admin/product.api";

type TProductSearchProps = {
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<TProductItemWithQuanity[]>
  >;
  selectedProduct: TProductItemWithQuanity[];
  initialProducts?: TProductItemWithQuanity[];
};

const ProductSearch = ({
  setSelectedProduct,
  selectedProduct,
}: TProductSearchProps) => {
  const [inputValue, setInputValue] = useState("");
  const searchTerm = useDebounce({ value: inputValue });

  const { data } = useGetAllProductsQuery(
    {
      searchTerm,
    },
    {
      skip: !searchTerm,
    }
  );

  const handleInputChage = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const handleSuggetionClick = (item: TProduct) => {
    setInputValue("");
    const isProductAlreadySelected = selectedProduct.find(
      (product) => product._id === item._id
    );

    if (isProductAlreadySelected && !isProductAlreadySelected.isDeleted) {
      return toast.error("This product already selected");
    }

    if (isProductAlreadySelected?.isDeleted) {
      //when purchase and sale edit. then isProductAlreadySelected contain isDeleted field if the product remove from the sale or purchase
      const products = [...selectedProduct];
      const product = products.find((product) => product._id === item._id);
      delete product!.isDeleted;
      setSelectedProduct(products);
    } else {
      setSelectedProduct((prevItem) => [
        ...prevItem,
        { ...item, quantity: 1, product: item._id, AddedWhenEdit: true },
        // AddedWhenEdit: true use kora hobe jekhon sale or pruchase edit er somoy jodi notun product add kora hobe tokhon
      ]);
    }
  };

  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="search product code or name..."
        value={inputValue}
        onChange={handleInputChage}
      />
      {data?.data?.length > 0 && inputValue && (
        <ul className="h-[300px] w-full overflow-y-scroll top-14 absolute bg-white z-50 left-1/2 -translate-x-1/2 rounded-md border">
          {data?.data?.map((item: TProduct) => (
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

export default ProductSearch;

/**
 * const totalTax = (item.productPrice / 100) * item.tax;

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
 */
