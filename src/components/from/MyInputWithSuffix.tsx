import { HTMLInputTypeAttribute } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";

type TMyInputWithSuffix = {
  name: string;
  label: string;
  suffix: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

const MyInputWithSuffix = ({
  name,
  label,
  suffix,
  type = "number",
  placeholder,
  required = true,
  className = "",
}: TMyInputWithSuffix) => {
  const form = useFormContext();
  return (
    <div>
      <FormField
        control={form.control}
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <FormItem>
              <FormLabel
                className={cn({
                  "after:content-['*'] after:ml-1 after:text-destructive":
                    required,
                  "after:content-['(optional)'] after:ml-0.5": !required,
                })}
              >
                {label}
              </FormLabel>
              <FormControl>
                <div className="flex flex-col gap-2">
                  <div className="flex">
                    <Input
                      type={type}
                      className={cn("bg-transparent rounded-r-none", className)}
                      placeholder={placeholder || label}
                      {...field}
                    />
                    <span className="px-3 grid place-items-center bg-secondary text-primary rounded-r-md border border-l-0">
                      {suffix}
                    </span>
                  </div>

                  <FormMessage>{error?.message}</FormMessage>
                </div>
              </FormControl>
            </FormItem>
          );
        }}
      />
    </div>
  );
};

export default MyInputWithSuffix;
