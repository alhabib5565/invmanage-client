import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreatePaymentModal, { TPayFromProps } from "./CreatePaymentModal";
import { cn } from "@/lib/utils";

const PaymentModalOpenButton = ({
  collectedBy,
  customer_id,
  sale,
  className,
}: TPayFromProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "h-fit px-3 py-1.5 hover:bg-[#32c015] bg-[#1db000] rounded-lg",
          className
        )}
      >
        Pay
      </Button>

      {isOpen && (
        <CreatePaymentModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          collectedBy={collectedBy || ""}
          customer_id={customer_id || ""}
          sale={sale || ""}
        />
      )}
    </div>
  );
};

export default PaymentModalOpenButton;
