import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slice/authSlice";
import { toast } from "sonner";
import { Link } from "react-router-dom";
// import NotificationDropdown from "@/components/shared/NotificationDropdown";

const DashboardNav = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast("Logout Successfull");
  };
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div className="bg-white px-6 pt-6 pb-[10px] border-b flex justify-end items-center w-full sticky top-0 left-0 z-40">
      {/* <NotificationDropdown /> */}
      <div className=" flex justify-between items-center gap-4">
        <div className="flex gap-2">
          <div className="h-[41px] flex-col justify-center items-end gap-0.5 inline-flex">
            <p className="text-[#343a40] text-sm font-normal leading-[21px] tracking-tight">
              {user?.mobileNumber}
            </p>
            <p className="text-[#6c757d] text-xs font-normal leading-[18px] tracking-tight">
              {user?.role}
            </p>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="size-[42px] rounded-lg">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="space-y-4 p-4 ">
            {/*
            <DropdownMenuItem>
              <Settings className="size-5 mr-4" /> Settings
            </DropdownMenuItem> */}
            <Link to={`/${user?.role}/profile`}>
              <DropdownMenuItem>
                <User className="size-5 mr-4" /> Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <Button
              onClick={handleLogout}
              className={cn("text-red-600 bg-transparent hover:bg-transparent")}
            >
              <LogOut className="size-5 mr-4" /> Logout
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default DashboardNav;
