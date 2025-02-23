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

type TMyInput = {
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  isGrid?: boolean;
  required?: boolean;
};

const MyInput = ({
  name,
  label,
  type,
  placeholder,
  isGrid,
  required = true,
}: TMyInput) => {
  const form = useFormContext();
  return (
    <div>
      <FormField
        control={form.control}
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <FormItem
              className={cn({
                "grid grid-cols-1 md:grid-cols-7 md:gap-4 items-center": isGrid,
              })}
            >
              <FormLabel
                className={cn({
                  " md:col-span-2": isGrid,
                  "after:content-['*'] after:ml-1 after:text-destructive":
                    required,
                  "after:content-['(optional)'] after:ml-0.5": !required,
                })}
              >
                {label}
              </FormLabel>
              <FormControl
                className={cn({
                  "col-span-5": isGrid,
                })}
              >
                <div className="flex flex-col gap-2">
                  <Input
                    type={type}
                    className="bg-transparent"
                    placeholder={placeholder || label}
                    {...field}
                  />
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

export default MyInput;
