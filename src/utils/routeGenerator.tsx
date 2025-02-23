import EditProfile from "@/components/pages/dashboard/profile/EditProfile";
import Profile from "@/components/pages/dashboard/profile/Profile";
import { TRoute, TUserPath } from "@/type/routesAndSidebarItems.type";

export const routeGenerator = (items: TUserPath[]) => {
  const routes = items.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) => {
        acc.push({
          path: child.path!,
          element: child.element,
        });
      });
    }

    return acc;
  }, []);

  routes.push(
    {
      path: "profile",
      element: <Profile />,
    },
    {
      path: "profile/:id",
      element: <EditProfile />,
    }
  );

  return routes;
};
