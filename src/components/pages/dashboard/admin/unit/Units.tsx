import PageHeader from "@/components/shared/PageHeader";
import CreateUnitModal from "./CreateUnitModal";

const Units = () => {
  return (
    <div>
      <div className="flex justify-between items-end">
        <PageHeader />
        <CreateUnitModal />
      </div>
    </div>
  );
};

export default Units;
