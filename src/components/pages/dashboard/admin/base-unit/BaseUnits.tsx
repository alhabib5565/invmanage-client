import PageHeader from "@/components/shared/PageHeader";
import CreateBaseUnitModal from "./CreateBaseUnitModal";

const BaseUnits = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <PageHeader />
        <CreateBaseUnitModal />
      </div>
    </div>
  );
};

export default BaseUnits;
