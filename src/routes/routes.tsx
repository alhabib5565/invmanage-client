import { createBrowserRouter } from "react-router-dom";
import Login from "@/components/pages/auth/Login";
import Register from "@/components/pages/auth/Register";
import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { routeGenerator } from "@/utils/routeGenerator";
import { adminPaths } from "./admin.routes";
import ProtectedRoute from "@/components/layout/ProtectedRoute";
import { salesExecutivePaths } from "./salesExecutive.routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/sales-executive",
    element: (
      <ProtectedRoute allowedRoles={["sales-executive"]}>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: routeGenerator(salesExecutivePaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
