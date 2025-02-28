import MyForm from "@/components/from/MyForm";
import MyModal from "@/components/shared/MyModal";
import { Button } from "@/components/ui/button";
import {
  useEditBaseUnitMutation,
  useGetSingleBaseUnitQuery,
} from "@/redux/api/admin/baseUnit.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenSquare } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { baseUnitFormSchema } from "./baseUnit.validation";
import MyInput from "@/components/from/MyInput";
import MyTextarea from "@/components/from/MyTextarea";
import Loading from "@/components/shared/Loading";

const EditBaseUnitModal = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editBaseUnit, { isLoading: isEditLoading }] =
    useEditBaseUnitMutation();

  const { data, isLoading } = useGetSingleBaseUnitQuery(id);
  if (isLoading) return <Loading />;
  console.log(data);
  const onSubmit = async (value: FieldValues) => {
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await editBaseUnit({ data: value, id }).unwrap();
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
        <MyForm
          onSubmit={onSubmit}
          resolver={zodResolver(baseUnitFormSchema)}
          defaultValues={data?.data}
        >
          <div className="space-y-4">
            <MyInput name="name" label="Base unit name" type="text" />
            <MyTextarea
              rows={3}
              name="description"
              label="Description"
              required={false}
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button disabled={isEditLoading}>
              {isEditLoading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </MyForm>
      </MyModal>
    </div>
  );
};

export default EditBaseUnitModal;
