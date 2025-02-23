import MobileSidebar from "./MobileSidebar";
import DesktopSidebar from "./DesktopSidebar";
import { sidebarItemsGenerator } from "@/utils/sidebarItemsGenerator";
import { adminPaths } from "@/routes/admin.routes";
import { TSidebarItem } from "@/type/routesAndSidebarItems.type";
import { salesExecutivePaths } from "@/routes/salesExecutive.routes";
import { useAppSelector } from "@/redux/hooks";

const userRole = {
  ADMIN: "admin",
  SALES_EXECUTIVE: "sales-executive",
};

const Sidebar = () => {
  const user = useAppSelector((state) => state.auth.user);
  const role = user?.role;

  let sidebarItems: TSidebarItem[] = [];
  switch (role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.SALES_EXECUTIVE:
      sidebarItems = sidebarItemsGenerator(
        salesExecutivePaths,
        userRole.SALES_EXECUTIVE
      );
      break;

    default:
      break;
  }

  return (
    <div>
      <div className="lg:hidden">
        <MobileSidebar sidebarItems={sidebarItems} />
      </div>
      <div className="hidden lg:flex">
        <DesktopSidebar sidebarItems={sidebarItems} />
      </div>
    </div>
  );
};

export default Sidebar;
