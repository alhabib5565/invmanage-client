import CreateCustomerForm from "@/components/shared/CreateCustomerForm";
import MyModal, { TMyModalOpenProps } from "@/components/shared/MyModal";

const CreateCustomerModal = ({ isOpen, setIsOpen }: TMyModalOpenProps) => {
  return (
    <div>
      <MyModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Create a new customer"
      >
        <div className="space-y-3">
          <CreateCustomerForm />
        </div>
      </MyModal>
    </div>
  );
};

export default CreateCustomerModal;
