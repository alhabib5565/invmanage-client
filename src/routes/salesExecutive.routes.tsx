import AssignedBooks from "@/components/pages/dashboard/salesExecutive/assigned-books/AssignedBooks";
import SalesExecBookSales from "@/components/pages/dashboard/salesExecutive/salesExec-book-sale/SalesExecBookSales";
import SalesExecDashboardHome from "@/components/pages/dashboard/salesExecutive/salesExecDashboardHome/SalesExecDashboardHome";
import SaleEntry from "@/components/shared/saleEntry/SaleEntry";
import { TUserPath } from "@/type/routesAndSidebarItems.type";
import { Book, BookA, DollarSign, LayoutDashboard } from "lucide-react";

export const salesExecutivePaths: TUserPath[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <SalesExecDashboardHome />,
    icon: LayoutDashboard,
  },
  {
    name: "Assigned Books",
    path: "assigned-books",
    element: <AssignedBooks />,
    icon: BookA,
  },
  {
    name: "Book Sales",
    icon: DollarSign,
    children: [
      {
        name: "Book Sales",
        path: "book-sales",
        element: <SalesExecBookSales />,
        icon: Book,
      },
      {
        name: "Sale Entry",
        path: "sale-entry",
        element: <SaleEntry />,
        icon: Book,
      },
    ],
  },
];
