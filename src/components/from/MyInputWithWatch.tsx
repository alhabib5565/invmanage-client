import React, { HTMLInputTypeAttribute } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useFormContext, useWatch } from "react-hook-form";
import { cn } from "@/lib/utils";

type TMyInputWithWatch = {
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
  placeholder: string;
  isGrid?: boolean;
  onValueChange: React.Dispatch<React.SetStateAction<number>>;
  required?: boolean;
};

const MyInputWithWatch = ({
  name,
  label,
  type,
  placeholder,
  isGrid,
  onValueChange,
  required = true,
}: TMyInputWithWatch) => {
  const form = useFormContext();
  const selectValue = useWatch({
    control: form.control,
    name,
  });

  React.useEffect(() => {
    onValueChange(selectValue);
  }, [onValueChange, selectValue]);
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        return (
          <FormItem
            className={cn({
              "grid grid-cols-7 gap-4 items-center": isGrid,
            })}
          >
            <FormLabel
              className={cn({
                "md:col-span-2": isGrid,
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
                  placeholder={placeholder}
                  {...field}
                />
                <FormMessage>{error?.message}</FormMessage>
              </div>
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};

export default MyInputWithWatch;
