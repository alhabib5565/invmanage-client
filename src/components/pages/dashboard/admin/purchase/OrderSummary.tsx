import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TOrderSummary } from "./CreatePurchase";

type TOrderSummaryProps = {
  setOrderSummary: React.Dispatch<React.SetStateAction<TOrderSummary>>;
};
const OrderSummary = ({ setOrderSummary }: TOrderSummaryProps) => {
  const updateOrderSummary = (field: string, value: number) => {
    setOrderSummary((prevOrderSummary) => ({
      ...prevOrderSummary,
      [field]: value,
    }));
  };
  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
      <OrderSummaryInput
        updateOrderSummary={updateOrderSummary}
        name="taxRate"
        label="Tax Rate"
        suffix="%"
        placeholder="Enter Tax Rate"
      />

      <OrderSummaryInput
        updateOrderSummary={updateOrderSummary}
        name="discountAmount"
        label="Discount"
        suffix="TK"
        placeholder="Enter Discount Amount"
      />
      <OrderSummaryInput
        updateOrderSummary={updateOrderSummary}
        name="shipping"
        label="Shipping"
        suffix="TK"
        placeholder="Enter Shipping Charge"
      />
    </div>
  );
};

export default OrderSummary;

const OrderSummaryInput = ({
  updateOrderSummary,
  label,
  placeholder,
  name,
  suffix,
}: {
  updateOrderSummary: (field: string, value: number) => void;
  label: string;
  placeholder: string;
  name: string;
  suffix: string;
}) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex">
        <Input
          onChange={(e) => updateOrderSummary(name, Number(e.target.value))}
          type="number"
          className="bg-transparent rounded-r-none"
          placeholder={placeholder}
        />
        <span className="px-3 grid place-items-center bg-secondary text-primary rounded-r-md border border-l-0">
          {suffix}
        </span>
      </div>
    </div>
  );
};
