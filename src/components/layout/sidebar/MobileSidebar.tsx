import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
// import logo from "../../../../assets/logo/logo.png";
import SidebarDropdownItem from "./SidebarDropdownItem";
import SingleSidebarItem from "./SingleSidebarItem";
import { TSidebarItem } from "@/type/routesAndSidebarItems.type";

const MobileSidebar = ({ sidebarItems }: { sidebarItems: TSidebarItem[] }) => {
  // state
  const [isDropdownOpen, setIsDropdownOpen] = useState("");
  const [hide, setHide] = useState(true);

  // handler
  const handleHide = () => {
    setHide((prev) => !prev);
  };

  return (
    <div className="relative">
      <Button
        variant={"outline"}
        onClick={handleHide}
        className="fixed top-4 left-5 z-50"
      >
        <MenuIcon className="text-black " />
      </Button>
      <div
        className={cn(
          " w-[300px] fixed top-0 left-0 min-h-screen overflow-y-scroll z-20 bg-white transition-all duration-200 ease-out",
          {
            "translate-x-[-100%]": hide,
          }
        )}
      >
        <Link to={"#"}>
          <img
            alt="logo"
            src={"logo"}
            className="mx-auto mb-4 w-[115.83px] h-12"
          />
        </Link>
        <hr className=" mb-6" />
        <div className="space-y-6">
          {sidebarItems?.map((item, index) => {
            return item.children && item.children.length > 0 ? (
              <SidebarDropdownItem
                setIsDropdownOpen={setIsDropdownOpen}
                isDropdownOpen={isDropdownOpen}
                item={item}
                key={index}
              />
            ) : (
              <SingleSidebarItem key={index} item={item} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
