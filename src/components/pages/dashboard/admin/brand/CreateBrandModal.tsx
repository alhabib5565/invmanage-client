import MyModal from "@/components/shared/MyModal";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pen } from "lucide-react";
import defaultImage from "../../../../../assets/brand_logo.png";
import { useCreateBrandMutation } from "@/redux/api/admin/brand.api";

const CreateBrandModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [brandName, setBrandName] = useState("");
  const [createBrand, { isLoading }] = useCreateBrandMutation();
  const handleImageChage = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(e?.target?.files && e.target.files[0]);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onSubmit = async () => {
    const formData = new FormData();
    if (selectedImage) {
      formData.append("file", selectedImage);
    }
    formData.append("data", JSON.stringify({ name: brandName }));
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await createBrand(formData).unwrap();
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
  return (
    <div>
      <Button onClick={() => setIsOpen(!isOpen)}>Create</Button>
      <MyModal isOpen={isOpen} setIsOpen={setIsOpen} title="Create a new brand">
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Brand Name *</label>
            <Input
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Enter brand name"
              className="mt-1"
            />
          </div>
          <div>
            <span className="font-semibold">Brand Logo (Optional)</span>
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
                    : defaultImage
                }
              />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={onSubmit} disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </div>
      </MyModal>
    </div>
  );
};

export default CreateBrandModal;
