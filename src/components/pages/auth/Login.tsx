import MyForm from "@/components/from/MyForm";
import MyInput from "@/components/from/MyInput";
import { Button } from "@/components/ui/button";
import { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/api/auth.api";
import { useAppDispatch } from "@/redux/hooks";
import { decodeUser } from "@/lib/jwtDecode";
import { login, TUserInfo } from "@/redux/slice/authSlice";

const formSchema = z.object({
  mobileNumber: z
    .string({
      required_error: "Mobile is required",
    })
    .length(11, { message: "Mobile number must be 11 characters" }),
  // .mobile({ message: "Invalid mobile address" }),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const defaultValue = {
  mobile: "",
  password: "",
};

const Login = () => {
  const [loginNow] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Processing your login request...");
    try {
      const res = await loginNow(data).unwrap();
      toast.success(res.message || "Login successful! Welcome back", {
        id: toastId,
      });
      const accessToken = res?.data?.accessToken;
      const user = decodeUser(accessToken) as TUserInfo;
      console.log({ accessToken, user });
      dispatch(login({ user, token: accessToken }));
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (user.role === "sales-executive") {
        navigate("/sales-executive/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please try again", {
        id: toastId,
      });
    }
  };
  return (
    <div className="flex flex-col gap-10 py-10 justify-center items-center min-h-screen h-full ">
      <div className="p-6 border  rounded-[30px] bg-gray-50">
        <h3 className="text-center text-xl font-semibold mb-6">Login</h3>
        <div className="w-[350px] ">
          <MyForm
            onSubmit={onSubmit}
            resolver={zodResolver(formSchema)}
            defaultValues={defaultValue}
          >
            <div className="grid gap-4 grid-cols-1">
              <MyInput
                name="mobileNumber"
                label="Enter Mobile"
                type="tel"
                placeholder="Mobile"
              />
              <MyInput
                name="password"
                label="Enter Password"
                type="password"
                placeholder="Password"
              />
              <div className="flex justify-between">
                <span className="text-[#667085] text-base font-normal font-roboto leading-normal">
                  Remember me
                </span>

                <Link
                  to={"#"}
                  className="text-[#ffcd05] text-base font-normal font-roboto leading-normal"
                >
                  Forgot Password
                </Link>
              </div>
              <Button>Sign In</Button>
            </div>
          </MyForm>
        </div>
      </div>

      <p>
        <span className="text-[#344054] text-lg leading-[38.40px] tracking-tight">
          Don’t have an account?{" "}
        </span>
        <Link
          to="/register"
          className="text-[#0056b3] text-lg leading-[38.40px] tracking-tight"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
