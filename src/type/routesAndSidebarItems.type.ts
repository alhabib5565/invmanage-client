import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TSidebarItem = {
  label: string;
  href: string;
  icon?: LucideIcon;
  children?: TSidebarItem[];
};

export type TUserPath = {
  name?: string;
  path?: string;
  icon?: LucideIcon;
  element?: ReactNode;
  children?: TUserPath[];
};
