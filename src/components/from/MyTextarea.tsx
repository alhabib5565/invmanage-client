import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useFormContext } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

type TMyTextarea = {
  name: string;
  label: string;
  placeholder?: string;
  rows: number;
  required?: boolean;
};

const MyTextarea = ({
  name,
  label,
  placeholder,
  rows,
  required = true,
}: TMyTextarea) => {
  const form = useFormContext();
  return (
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
              <Textarea
                rows={rows}
                className="bg-transparent"
                placeholder={placeholder || label}
                {...field}
              />
            </FormControl>
            <FormMessage>{error?.message}</FormMessage>
          </FormItem>
        );
      }}
    />
  );
};

export default MyTextarea;
