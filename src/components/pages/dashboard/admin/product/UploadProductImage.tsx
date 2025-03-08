/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import { ChangeEvent, Dispatch } from "react";
import { Label } from "@/components/ui/label";
import { Loader, PlusCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useDeleteProductImageMutation,
  useUploadProductImageMutation,
} from "@/redux/api/admin/product.api";
import { toast } from "sonner";
import { TImage } from "./product.type";
import { cn } from "@/lib/utils";
import Swal from "sweetalert2";
type TProductImgUploadProps = {
  images: TImage[];
  setImages: Dispatch<React.SetStateAction<TImage[]>>;
  isConfirmationDelete?: boolean;
};
const UploadProductImage = ({
  images,
  setImages,
  isConfirmationDelete = false,
}: TProductImgUploadProps) => {
  const [uploadImage, { isLoading: isUploadLoading }] =
    useUploadProductImageMutation();
  const [deleteImage, { isLoading: deleteLoding }] =
    useDeleteProductImageMutation();

  const handleImageChage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await uploadImage(formData).unwrap();
        toast.success(res.message || "Request successful!");
        setImages((prevState) => [
          ...prevState,
          {
            secure_url: res?.data?.secure_url,
            public_id: res?.data?.public_id,
          },
        ]);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        toast.error(error?.data?.message || "Request failed. Please try again");
      }
    }
  };

  const handleRemoveImage = async (public_id: string) => {
    if (isConfirmationDelete) {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        try {
          const res: any = await deleteImage(public_id).unwrap();
          setImages(images.filter((image) => image.public_id !== public_id));
          Swal.fire({
            title: "Deleted!",
            text: res?.message || "Deleted successfully.",
            icon: "success",
            confirmButtonColor: "#3085d6",
          });
        } catch (error: any) {
          Swal.fire({
            title: "Error!",
            text: error?.data?.message || "Failed to delete.",
            icon: "error",
            confirmButtonColor: "#d33",
          });
        }
      }
    } else {
      await deleteImage(public_id);
      setImages(images.filter((image) => image.public_id !== public_id));
    }
  };

  return (
    <div className="grid grid-cols-5">
      {images?.map((image, index) => (
        <div key={index} className="relative">
          <img
            className="object-contain border rounded size-[78px]"
            src={image?.secure_url}
          />
          <Button
            type="button"
            disabled={deleteLoding}
            onClick={() => handleRemoveImage(image?.public_id)}
            variant="outline"
            className=" p-0 h-fit size-6 rounded-full absolute top-1 right-3 z-10 text-red-500 hover:text-red-500"
          >
            <X />
          </Button>
        </div>
      ))}

      {images?.length < 5 && (
        <div className="border rounded size-[78px] relative">
          <Label
            htmlFor="upload"
            className={cn(
              "cursor-pointer absolute bg-secondary text-primary inset-0 z-10 border grid items-center justify-center gap-1",
              {
                "cursor-not-allowed": isUploadLoading,
              }
            )}
          >
            {isUploadLoading ? (
              <Loader className="animate-spin" />
            ) : (
              <span className="text-xs">
                <PlusCircle size={25} className="mx-auto mb-1" />
                Add Image
              </span>
            )}
          </Label>
          <Input
            disabled={isUploadLoading}
            onChange={handleImageChage}
            className="hidden"
            accept=".png"
            id="upload"
            type="file"
          />
        </div>
      )}
    </div>
  );
};

export default UploadProductImage;
