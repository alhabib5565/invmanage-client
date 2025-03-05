import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import defaultImage from "../../../../../assets/brand_logo.png";
import { Label } from "@/components/ui/label";
import { Pen } from "lucide-react";

const UploadProductImage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const handleImageChage = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(e?.target?.files && e.target.files[0]);
  };
  return (
    <div className="border rounded size-[78px] relative mt-3 bg-[#F2F2F2]">
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
        src={selectedImage ? URL.createObjectURL(selectedImage) : defaultImage}
      />
    </div>
  );
};

export default UploadProductImage;
