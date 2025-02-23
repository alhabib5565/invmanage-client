import MyModal, { TMyModalOpenProps } from "@/components/shared/MyModal";
import MyForm from "@/components/from/MyForm";
import MySelectWithWatch from "@/components/from/MySelectWithWatch";
import useCustomerOptions from "@/hooks/useCustomerOptions";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { SaleSelect } from "./SaleSelect";
import MySelect from "@/components/from/MySelect";
import useEmployeeOptions from "@/hooks/useEmployeeOptions";
import MyInput from "@/components/from/MyInput";
import MyTextarea from "@/components/from/MyTextarea";
import { toast } from "sonner";
import { paymentFormSchema } from "./createPayment.validation";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreatePaymentMutation } from "@/redux/api/payment.api";

export type TPayFromProps = {
  customer_id?: string;
  collectedBy?: string;
  sale?: string;
};

const CreatePaymentModal = ({
  isOpen,
  setIsOpen,
  customer_id,
  collectedBy,
  sale,
}: TMyModalOpenProps & TPayFromProps) => {
  const [customer, setCustomer] = useState(customer_id || "");
  const [sale_id, setSale_id] = useState(sale || "");

  //
  const [createPayment, { isLoading }] = useCreatePaymentMutation();
  // default value
  const defaultValues = {
    customer: customer_id || "",
    collectedBy: collectedBy || "",
    amountCollected: "",
    paymentDate: "",
    notes: "",
  };

  const onSubmit = async (value: FieldValues) => {
    if (!sale_id) {
      return toast.error("Please Select a sale.");
    }
    value.sale = sale_id;
    const toastId = toast.loading("Processing your request...");
    try {
      const res = await createPayment(value).unwrap();
      toast.success(res.message || "Request successful!", {
        id: toastId,
      });
      setSale_id("");
      setCustomer("");
      setIsOpen(false);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Request failed. Please try again", {
        id: toastId,
      });
    }
    console.log(value);
  };

  const { employeeNameOptions } = useEmployeeOptions();
  const { customerOptions } = useCustomerOptions();

  return (
    <div>
      <MyModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Create a new Payment"
      >
        <MyForm
          onSubmit={onSubmit}
          resolver={zodResolver(paymentFormSchema)}
          defaultValues={defaultValues}
        >
          <div className="space-y-4">
            {!customer_id && (
              <MySelectWithWatch
                onValueChange={setCustomer}
                name="customer"
                label="Select Customer"
                placeholder="Search customer by name"
                isSuggestion
                options={customerOptions || []}
              />
            )}
            {!sale && (
              <SaleSelect customer={customer} setSale_id={setSale_id} />
            )}

            {!collectedBy && (
              <MySelect
                name="collectedBy"
                label="Collected By"
                placeholder="Search sales executive"
                isSuggestion
                options={employeeNameOptions || []}
              />
            )}
            <MyInput
              name="amountCollected"
              label="Collected Amount"
              type="number"
            />
            <MyInput name="paymentDate" label="Payment Date" type="date" />
            <MyTextarea rows={3} name="notes" label="Notes" required={false} />
          </div>
          <div className="flex justify-end">
            <Button disabled={!customer || !sale_id || isLoading}>
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </MyForm>
      </MyModal>
    </div>
  );
};

export default CreatePaymentModal;
