import { Link } from "react-router-dom";
import SidebarDropdownItem from "./SidebarDropdownItem";
import SingleSidebarItem from "./SingleSidebarItem";
// import logo from "../../../../assets/logo/logo.png";
import { TSidebarItem } from "@/type/routesAndSidebarItems.type";
import { useState } from "react";

const DesktopSidebar = ({ sidebarItems }: { sidebarItems: TSidebarItem[] }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState("");
  return (
    <div className=" w-[300px] fixed top-0 left-0 min-h-screen h-full overflow-y-scroll p-6">
      <Link to={"#"}>
        <img
          alt="logo"
          src={"logo"}
          className="mx-auto mb-2 w-[115.83px] h-12"
        />
      </Link>
      <hr className=" mb-6" />

      <div className="space-y-6">
        {sidebarItems.map((item, index) => {
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
  );
};

export default DesktopSidebar;
