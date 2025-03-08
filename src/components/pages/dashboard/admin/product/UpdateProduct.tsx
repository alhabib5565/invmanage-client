import MyForm from "@/components/from/MyForm";

import MyInput from "@/components/from/MyInput";
import MySelect from "@/components/from/MySelect";
import PageHeader from "@/components/shared/PageHeader";
import { FieldValues } from "react-hook-form";
import MySelectWithWatch from "@/components/from/MySelectWithWatch";
import MyTextarea from "@/components/from/MyTextarea";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useMemo, useState } from "react";
import useBrandOption from "@/hooks/useBrandOption";
import useCategoryOptions from "@/hooks/useCategoryOptions";
import useBaseUnitOptions from "@/hooks/useBaseUnitOptions";
import useUnitOptions from "@/hooks/useUnitOptions";
import UploadProductImage from "./UploadProductImage";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import {
  useEditProductMutation,
  useGetSingleProductQuery,
} from "@/redux/api/admin/product.api";
import { TImage } from "./product.type";
import Loading from "@/components/shared/Loading";
import { productEditSchema } from "./product.validation";
const UpdateProduct = () => {
  // state
  const [productUnit, setProductUnit] = useState("");
  const [images, setImages] = useState<TImage[]>([]);
  const { id } = useParams();

  const setProductUnitAction = useCallback(setProductUnit, [setProductUnit]);
  const navigate = useNavigate();

  const { data, isLoading } = useGetSingleProductQuery(id);
  const [eidtProduct, { isLoading: editLoading }] = useEditProductMutation();

  const onSubmit = async (value: FieldValues) => {
    value.images = images;
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await eidtProduct({ data: value, id }).unwrap();
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

  const prevData = data?.data;
  useEffect(() => {
    setImages(prevData?.images);
  }, [prevData]);

  const defaultValues = useMemo(() => {
    if (isLoading) return;
    return {
      productName: prevData.productName,
      brand: prevData.brand._id,
      category: prevData.category._id,
      productUnit: prevData.productUnit?._id,
      purchaseUnit: prevData.purchaseUnit?._id,
      saleUnit: prevData.saleUnit?._id,
    };
  }, [prevData, isLoading]);

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <PageHeader isBack pageTitle="Edit Product" />
      <div className="bg-white rounded-[16px] p-6 shadow border border-[#f2f4f7]">
        <MyForm
          onSubmit={onSubmit}
          resolver={zodResolver(productEditSchema)}
          defaultValues={defaultValues}
        >
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <MyInput name="productName" label="Product Name" type="text" />

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

            <div className="col-span-1 lg:col-span-2">
              <MyTextarea name="note" label="Note" rows={2} required={false} />
            </div>
            <div className="col-span-1 h-full grid items-end">
              <UploadProductImage
                images={images}
                setImages={setImages}
                isConfirmationDelete
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button type="submit">{editLoading ? "Saving..." : "Save"}</Button>
          </div>
        </MyForm>
      </div>
    </div>
  );
};

export default UpdateProduct;
