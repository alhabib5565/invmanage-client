import MyForm from "@/components/from/MyForm";

import MyInput from "@/components/from/MyInput";
import MySelect from "@/components/from/MySelect";
import PageHeader from "@/components/shared/PageHeader";
import { FieldValues } from "react-hook-form";
import MySelectWithWatch from "@/components/from/MySelectWithWatch";
import MyTextarea from "@/components/from/MyTextarea";
import { Button } from "@/components/ui/button";
import { useCallback, useState } from "react";
import MyInputWithSuffix from "@/components/from/MyInputWithSuffix";
import useBrandOption from "@/hooks/useBrandOption";
import useCategoryOptions from "@/hooks/useCategoryOptions";
import useBaseUnitOptions from "@/hooks/useBaseUnitOptions";
import useUnitOptions from "@/hooks/useUnitOptions";
import UploadProductImage from "./UploadProductImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { productDefaultValues, productSchema } from "./product.validation";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "@/redux/api/admin/product.api";
import { TImage } from "./product.type";

const CreateProduct = () => {
  // state
  const [productUnit, setProductUnit] = useState("");
  const [images, setImages] = useState<TImage[]>([]);

  const setProductUnitAction = useCallback(setProductUnit, [setProductUnit]);
  const navigate = useNavigate();

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const onSubmit = async (value: FieldValues) => {
    value.images = images;
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await createProduct(value).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
      navigate("/admin/products");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
  };

  // select options
  const { brandOptions } = useBrandOption();
  const { categoryOptions } = useCategoryOptions();
  const { baseUnitOptions } = useBaseUnitOptions();
  const { unitOptions } = useUnitOptions(productUnit);
  return (
    <div className="space-y-6">
      <PageHeader isBack />
      <div className="bg-white rounded-[16px] p-6 shadow border border-[#f2f4f7]">
        <MyForm
          onSubmit={onSubmit}
          resolver={zodResolver(productSchema)}
          defaultValues={productDefaultValues}
        >
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <MyInput name="productName" label="Product Name" type="text" />
            <MyInput name="code" label="Product Code" type="text" />

            <MySelect
              name="brand"
              label="Brand"
              isSuggestion={true}
              options={brandOptions || []}
              placeholder="Choose Brand"
            />
            <MySelect
              name="category"
              label="Category"
              isSuggestion={true}
              options={categoryOptions || []}
              placeholder="Choose Category"
            />

            <MySelectWithWatch
              onValueChange={setProductUnitAction}
              name="productUnit"
              label="Product Unit"
              isSuggestion={true}
              options={baseUnitOptions || []}
              placeholder="Choose Product Unit"
            />
            <MySelect
              name="purchaseUnit"
              label="Purchase Unit"
              isSuggestion={true}
              options={unitOptions || []}
              placeholder="Choose Purchase Unit"
              disabled={!productUnit}
            />
            <MySelect
              name="saleUnit"
              label="Sale Unit"
              isSuggestion={true}
              options={unitOptions || []}
              placeholder="Choose Sale Unit"
              disabled={!productUnit}
            />
            <MySelect
              name="taxType"
              label="Tax Type"
              isSuggestion={false}
              options={[
                {
                  label: "Inclusive",
                  value: "inclusive",
                },
                {
                  label: "Exclusive",
                  value: "exclusive",
                },
              ]}
              placeholder="Choose Tax Type"
            />
            <MyInput
              name="stockAlert"
              label="Stock alert"
              placeholder="Enter Stock Alert"
              type="number"
            />
            <MyInputWithSuffix
              name="productCost"
              label="Product Cost"
              suffix="TK"
              placeholder="Enter Purchase Cost"
            />
            <MyInputWithSuffix
              name="productPrice"
              label="Price"
              suffix="TK"
              placeholder="Enter Sell Price"
            />
            <MyInputWithSuffix
              name="productTaxRate"
              label="Tax Rate"
              suffix="%"
              placeholder="Enter Order Tax"
            />
            <MyInputWithSuffix
              name="discountAmount"
              label="Unit Discount"
              suffix="TK"
              placeholder="Enter Discount"
            />
            <div></div>
            <div className="col-span-1 lg:col-span-2">
              <MyTextarea name="note" label="Note" rows={2} required={false} />
            </div>
            <div className="col-span-1 h-full grid items-end">
              <UploadProductImage images={images} setImages={setImages} />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </MyForm>
      </div>
    </div>
  );
};

export default CreateProduct;
