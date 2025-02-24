import AdminBookSaleList from "@/components/pages/dashboard/admin/admin-book-sale/AdminBookSaleList";
import AdminDashboardHome from "@/components/pages/dashboard/admin/admin-dashboard-home/AdminDashboardHome";
import BaseUnits from "@/components/pages/dashboard/admin/base-unit/BaseUnits";
import BookPurchaseList from "@/components/pages/dashboard/admin/book-purchase/BookPurchaseList";
import CreateBookPurchase from "@/components/pages/dashboard/admin/book-purchase/CreateBookPurchase";
import BookList from "@/components/pages/dashboard/admin/book/BookList";
import BookStock from "@/components/pages/dashboard/admin/book/BookStock";
import CreateBook from "@/components/pages/dashboard/admin/book/CreateBook";
import EditBook from "@/components/pages/dashboard/admin/book/EditBook";
import Brands from "@/components/pages/dashboard/admin/brand/Brands";
import CreateBrand from "@/components/pages/dashboard/admin/brand/CreateBrand";
import UpdateBrand from "@/components/pages/dashboard/admin/brand/UpdateBrand";
import Categories from "@/components/pages/dashboard/admin/category/Categories";
import CreateCategory from "@/components/pages/dashboard/admin/category/CreateCategory";
import EditCategory from "@/components/pages/dashboard/admin/category/EditCategory";
import Customers from "@/components/pages/dashboard/admin/customer-management/Customers";
import AssignBookToEmp from "@/components/pages/dashboard/admin/empBookAssign/AssignBookToEmp";
import BookAssignList from "@/components/pages/dashboard/admin/empBookAssign/BookAssignList";
import CreateEmployee from "@/components/pages/dashboard/admin/employee-management/CreateEmployee";
import EditEmployeeInfo from "@/components/pages/dashboard/admin/employee-management/EditEmployeeInfo";
import EmployeeList from "@/components/pages/dashboard/admin/employee-management/EmployeeList";
import CreateProduct from "@/components/pages/dashboard/admin/product/CreateProduct";
import Products from "@/components/pages/dashboard/admin/product/Products";
import UpdateProduct from "@/components/pages/dashboard/admin/product/UpdateProduct";
import Units from "@/components/pages/dashboard/admin/unit/Units";
import CreateWarehouse from "@/components/pages/dashboard/admin/warehouse/CreateWarehouse";
import Warehouse from "@/components/pages/dashboard/admin/warehouse/Warehouse";
import SaleEntry from "@/components/shared/saleEntry/SaleEntry";
import { TUserPath } from "@/type/routesAndSidebarItems.type";
import {
  Book,
  DollarSign,
  WarehouseIcon,
  LayoutDashboard,
  User,
  UserCircle,
  UserCog,
} from "lucide-react";

export const adminPaths: TUserPath[] = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboardHome />,
    icon: LayoutDashboard,
  },
  {
    name: "Customers",
    path: "customers",
    element: <Customers />,
    icon: UserCircle,
  },
  {
    name: "Manage Employee",
    icon: UserCog,
    children: [
      {
        name: "Employee List",
        path: "employee-list",
        element: <EmployeeList />,
        icon: User,
      },
      {
        path: ":id/update-user-info",
        element: <EditEmployeeInfo />,
        icon: User,
      },
      {
        name: "Create Employee",
        path: "create-employee",
        element: <CreateEmployee />,
        icon: User,
      },
    ],
  },
  {
    name: "Manage Product",
    icon: UserCog,
    children: [
      {
        name: "Products",
        path: "products",
        element: <Products />,
        icon: User,
      },
      {
        path: "create-product",
        element: <CreateProduct />,
      },

      {
        path: ":id/edit-product",
        element: <UpdateProduct />,
      },
      // brand related
      {
        name: "Brands",
        path: "brands",
        element: <Brands />,
        icon: User,
      },
      {
        path: "create-brand",
        element: <CreateBrand />,
      },
      {
        path: ":id/edit-brand",
        element: <UpdateBrand />,
      },
      // category related
      {
        name: "Categories",
        path: "categories",
        element: <Categories />,
        icon: User,
      },
      {
        path: "create-category",
        element: <CreateCategory />,
      },
      {
        path: ":id/edit-category",
        element: <EditCategory />,
      },
      // units related
      {
        name: "Base Units",
        path: "base-units",
        element: <BaseUnits />,
        icon: User,
      },
      {
        name: "Units",
        path: "units",
        element: <Units />,
        icon: User,
      },
    ],
  },
  {
    name: "Warehouse",
    path: "warehouse",
    element: <Warehouse />,
    icon: WarehouseIcon,
  },
  {
    path: "create-warehouse",
    element: <CreateWarehouse />,
  },
  {
    name: "Book Management",
    icon: Book,
    children: [
      {
        name: "Create Book",
        path: "create-book",
        element: <CreateBook />,
        icon: User,
      },
      {
        name: "Book List",
        path: "book-list",
        element: <BookList />,
        icon: User,
      },
      {
        name: "Book Stock",
        path: "book-stock",
        element: <BookStock />,
        icon: User,
      },
      {
        path: ":id/edit-book",
        element: <EditBook />,
      },
    ],
  },
  {
    name: "Book Purchase",
    icon: Book,
    children: [
      {
        name: "Purchase List",
        path: "book-purchase-list",
        element: <BookPurchaseList />,
        icon: Book,
      },
      {
        name: "Create Purchase",
        path: "create-book-purchase",
        element: <CreateBookPurchase />,
        icon: Book,
      },
    ],
  },
  {
    name: "Admin Book Sale",
    icon: DollarSign,
    children: [
      {
        name: "Book Sales",
        path: "book-sales",
        element: <AdminBookSaleList />,
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
  {
    name: "Book Assing",
    icon: DollarSign,
    children: [
      {
        name: "Assign Book List",
        path: "assign-book-list",
        element: <BookAssignList />,
        icon: Book,
      },
      {
        name: "Assign Book",
        path: "assign-book",
        element: <AssignBookToEmp />,
        icon: Book,
      },
    ],
  },
];
