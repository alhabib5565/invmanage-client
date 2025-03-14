import PageHeader from "@/components/shared/PageHeader";
import { Input } from "@/components/ui/input";

const PurchaseList = () => {
  return (
    <div className="space-y-6">
      <PageHeader createBtnPaht="/admin/create-purchase" />
      <div className="p-6 border rounded-[16px] space-y-4 bg-white">
        <div className="pb-4 flex justify-end gap-4 ">
          <Input placeholder="Search..." className="w-fit" />
        </div>
      </div>
    </div>
  );
};

export default PurchaseList;
