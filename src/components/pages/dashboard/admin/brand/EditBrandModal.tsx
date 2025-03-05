import MyModal from "@/components/shared/MyModal";
import { Button } from "@/components/ui/button";

import { Pen, PenSquare } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import defaultImage from "../../../../../assets/brand_logo.png";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TBrand } from "./brand.type";
import { useEditBrandMutation } from "@/redux/api/admin/brand.api";

const EditBrandModal = ({ data }: { data: TBrand }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [brandName, setBrandName] = useState(data.name || "");

  const [editBrand, { isLoading: isEditLoading }] = useEditBrandMutation();

  const onSubmit = async () => {
    const toastId = toast.loading("Processing your request...");

    //handle form data
    const formData = new FormData();
    if (selectedImage) {
      formData.append("file", selectedImage);
    }
    formData.append("data", JSON.stringify({ name: brandName }));

    try {
      const res = await editBrand({ data: formData, id: data.slug }).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
      setIsOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
  };

  const handleImageChage = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(e?.target?.files && e.target.files[0]);
  };

  return (
    <div>
      <Button
        variant="ghost"
        size="icon"
        className="text-primary"
        onClick={() => setIsOpen(!isOpen)}
      >
        <PenSquare strokeWidth={2.5} />
      </Button>
      <MyModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Create a new base unit"
      >
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Brand Name</label>
            <Input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter brand name"
              className="mt-1"
            />
          </div>
          <div>
            <span className="font-semibold">Brand Logo </span>
            <div className="border rounded w-32 h-32 relative mt-3 bg-[#F2F2F2]">
              <Label
                htmlFor="upload"
                className="absolute bg-white -top-3 -right-3 z-10 border size-10 grid place-items-center rounded-full"
              >
                <Pen size={20} />
              </Label>
              <Input
                onChange={handleImageChage}
                className="hidden"
                accept=".png"
                id="upload"
                type="file"
              />

              <img
                className="object-contain h-full w-full"
                src={
                  selectedImage
                    ? URL.createObjectURL(selectedImage)
                    : data.logo || defaultImage
                }
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={onSubmit} disabled={isEditLoading || !brandName}>
              {isEditLoading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </div>
      </MyModal>
    </div>
  );
};

export default EditBrandModal;
