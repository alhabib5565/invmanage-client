import MyForm from "@/components/from/MyForm";
import MyModal from "@/components/shared/MyModal";
import { Button } from "@/components/ui/button";

// import { zodResolver } from "@hookform/resolvers/zod";
import { PenSquare } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import MyInput from "@/components/from/MyInput";
import MyTextarea from "@/components/from/MyTextarea";
import Loading from "@/components/shared/Loading";
import {
  useEditUnitMutation,
  useGetSingleUnitQuery,
} from "@/redux/api/admin/unit.api";
import MySelect from "@/components/from/MySelect";
import useBaseUnitOptions from "@/hooks/useBaseUnitOptions";
import { zodResolver } from "@hookform/resolvers/zod";
import { unitFormSchema } from "./unit.validation";

const EditUnitModal = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editBaseUnit, { isLoading: isEditLoading }] = useEditUnitMutation();

  const { baseUnitOptions } = useBaseUnitOptions();
  const { data, isLoading } = useGetSingleUnitQuery(id);

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
      <MyModal isOpen={isOpen} setIsOpen={setIsOpen} title="Edit unit">
        {isLoading ? (
          <Loading />
        ) : (
          <MyForm
            onSubmit={onSubmit}
            resolver={zodResolver(unitFormSchema)}
            defaultValues={data?.data}
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
              <Button disabled={isEditLoading}>
                {isEditLoading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </MyForm>
        )}
      </MyModal>
    </div>
  );
};

export default EditUnitModal;
