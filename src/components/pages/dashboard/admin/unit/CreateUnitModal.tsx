import MyModal from "@/components/shared/MyModal";
import MyForm from "@/components/from/MyForm";
import { FieldValues } from "react-hook-form";
import MyInput from "@/components/from/MyInput";
import MyTextarea from "@/components/from/MyTextarea";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import MySelect from "@/components/from/MySelect";
import useBaseUnitOptions from "@/hooks/useBaseUnitOptions";
import { useCreateUnitMutation } from "@/redux/api/admin/unit.api";
import { unitDefaultValue, unitFormSchema } from "./unit.validation";
const CreateUnitModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [createUnit, { isLoading }] = useCreateUnitMutation();

  const onSubmit = async (value: FieldValues) => {
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await createUnit(value).unwrap();
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

  const { baseUnitOptions } = useBaseUnitOptions();

  return (
    <div>
      <Button onClick={() => setIsOpen(!isOpen)}>Create</Button>
      <MyModal isOpen={isOpen} setIsOpen={setIsOpen} title="Create a new  unit">
        <MyForm
          onSubmit={onSubmit}
          resolver={zodResolver(unitFormSchema)}
          defaultValues={unitDefaultValue}
        >
          <div className="space-y-4">
            <MyInput name="name" label="Base Unit Name" type="text" />
            <MySelect
              name="baseUnit"
              isSuggestion={false}
              label="Select Base Unit"
              placeholder="Search Base Unit"
              options={baseUnitOptions || []}
            />
            <MyInput
              name="conversionRatio"
              label="Conversion Ratio"
              type="number"
            />
            <MySelect
              name="operator"
              isSuggestion={false}
              label="Select Operator"
              placeholder="Operator"
              options={[
                {
                  label: "Multiply(*)",
                  value: "*",
                },
                {
                  label: "Divide(/)",
                  value: "/",
                },
              ]}
            />
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

export default CreateUnitModal;
