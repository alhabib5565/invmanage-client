import MyModal from "@/components/shared/MyModal";
import MyForm from "@/components/from/MyForm";
import { FieldValues } from "react-hook-form";
import MyInput from "@/components/from/MyInput";
import MyTextarea from "@/components/from/MyTextarea";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
const CreateBaseUnitModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (value: FieldValues) => {
    const toastId = toast.loading("Processing your request...");
    try {
      //   const res = await createPayment(value).unwrap();
      //   toast.success(res.message || "Request successful!", {
      //     id: toastId,
      //   });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
    console.log(value);
  };

  const isLoading = false;

  return (
    <div>
      <Button onClick={() => setIsOpen(!isOpen)}>Create</Button>
      <MyModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Create a new base unit"
      >
        <MyForm
          onSubmit={onSubmit}
          resolver={zodResolver(baseUnitFormSchema)}
          defaultValues={baseUnitDefaultValue}
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
            <Button disabled={isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </MyForm>
      </MyModal>
    </div>
  );
};

export default CreateBaseUnitModal;

const baseUnitFormSchema = z.object({
  name: z.string().min(1, "Base unit name is required"),
  description: z.string().optional(),
});
const baseUnitDefaultValue = {
  name: "",
  description: "",
};
