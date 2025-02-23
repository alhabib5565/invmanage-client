import { TSidebarItem, TUserPath } from "@/type/routesAndSidebarItems.type";
import { User } from "lucide-react";

export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        label: item.name,
        href: `/${role}/${item.path}`,
        icon: item.icon,
      });
    }

    if (item.children && item.name) {
      acc.push({
        label: item.name,
        icon: item.icon,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        children: item.children.map((child) => {
          if (child.name) {
            return {
              label: child.name,
              href: `/${role}/${child.path}`,
              icon: child.icon,
            };
          }
        }),
      });
    }

    return acc;
  }, []);
  sidebarItems.push({
    href: `/${role}/profile`,
    label: "Profile",
    icon: User,
  });
  return sidebarItems;
};
