"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TBookSale } from "@/components/pages/dashboard/admin/admin-book-sale/adminBookSale.type";
import { useGetAllBookSalesQuery } from "@/redux/api/admin/bookSale.api";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

type TSaleOptions = {
  bookTitle: string;
  saleID: string;
  due: string;
  saleDate: string;
  label: string;
  value: string;
};

export function SaleSelect({
  customer,
  setSale_id,
}: {
  customer: string;
  setSale_id: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  React.useEffect(() => {
    setSale_id(value);
  }, [setSale_id, value]);

  const { data, isLoading } = useGetAllBookSalesQuery(
    {
      customer,
    },
    { skip: !customer }
  );
  const sales: TSaleOptions[] =
    data?.data
      .filter((sale: TBookSale) => sale?.dueAmount && sale?.dueAmount > 0)
      ?.map((sale: TBookSale) => {
        return {
          saleID: sale.saleId,
          bookTitle: sale.book.bookTitle,
          due: sale.dueAmount,
          saleDate: sale.saleDate,
          label: `${sale.saleId} ${sale.book.bookTitle} ${sale.dueAmount} TK`,
          value: sale._id,
        };
      }) || [];
  return (
    <div className="space-y-2">
      <Label className="after:content-['*'] after:ml-1 after:text-destructive">
        Select Sale
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={!customer || isLoading}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? sales.find((sale) => sale.value === value)?.label
              : "Select sale..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className=" w-[500px] p-0">
          <Command>
            <CommandInput placeholder="Search sale..." className="h-9" />
            <CommandList>
              <CommandEmpty>No sale found.</CommandEmpty>
              <CommandGroup>
                <div className="">
                  <div className="w-full flex bg-gray-100 static">
                    <span className="border p-1 w-16">Sale ID</span>
                    <span className="border p-1 flex-1">Book Title</span>
                    <span className="border p-1 w-20 truncate">Due Amount</span>
                    <span className="border p-1 w-24">Sale Date</span>
                  </div>
                  {sales.map((sale) => (
                    <CommandItem
                      key={sale.value}
                      value={sale.value}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                      className={cn(
                        "cursor-pointer transition flex w-full p-0",
                        value === sale.value ? "bg-blue-200" : ""
                      )}
                    >
                      <span className="border p-1 w-16">{sale.saleID}</span>
                      <span className="border p-1 flex-1">
                        {sale.bookTitle}
                      </span>
                      <span className="border p-1 w-20">{sale.due}</span>
                      <span className="border p-1 w-24">
                        {sale.saleDate.split("T")[0]}
                      </span>
                    </CommandItem>
                  ))}
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
