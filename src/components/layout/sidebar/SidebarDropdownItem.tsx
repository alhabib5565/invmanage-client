import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import SingleSidebarItem from "./SingleSidebarItem";
import { TSidebarItem } from "@/type/routesAndSidebarItems.type";

type TSidebarDropdownItemProps = {
  item: TSidebarItem;
  isDropdownOpen: string;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<string>>;
};

const SidebarDropdownItem = ({
  item,
  isDropdownOpen,
  setIsDropdownOpen,
}: TSidebarDropdownItemProps) => {
  // dropdown open handler
  const handleDropdownOpen = (label: string) => {
    if (isDropdownOpen && isDropdownOpen === item.label) {
      setIsDropdownOpen("");
    } else {
      setIsDropdownOpen(label);
    }
  };

  if (!item?.icon) return;
  return (
    <div className={cn({ "bg-[#EDF4FC80]": isDropdownOpen === item.label })}>
      <button
        onClick={() => handleDropdownOpen(item.label)}
        className="hover:bg-secondary w-full flex gap-1.5 items-center justify-between rounded-[8px] p-4 text-[16px] leading-[22.4px] tracking-[0.2px] text-light-subtext"
      >
        <div className="w-full flex justify-start gap-3 cursor-pointer">
          <item.icon className="size-6 text-primary" />
          <span className="grow text-left"> {item?.label}</span>
        </div>
        <ChevronDown
          className={cn("text-light-subtext size-5 duration-300", {
            "rotate-180 ": isDropdownOpen === item.label,
          })}
        />
      </button>

      {isDropdownOpen === item.label && (
        <div className="space-y-2 w-full h-full">
          {item.children?.map((dropdownItem, index) => (
            <SingleSidebarItem
              key={index}
              item={dropdownItem}
              isDropdownItem={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarDropdownItem;
