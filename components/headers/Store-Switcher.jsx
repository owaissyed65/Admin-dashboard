"use client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

export default function StoreSwitcher({ className, items = [] }) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const formattedItem = items.map((val) => ({
    label: val.name,
    value: val.id,
  }));
  const currentStore = formattedItem.find((val) => val.value === params.storId);
  const [open, setOpen] = useState(false);
  const onStoreSelect = (store) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="select a store"
          className={cn("w-[200px] flex justify-between", className)}
        >
          <Store className="mr-2 h-4 w-4" />
          <div className="line-clamp-1 break-words">{currentStore?.label}</div>
          <ChevronsUpDown className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput
              placeholder="search for a store"
              className="cursor-pointer"
            />
            <CommandEmpty>No Stores Found</CommandEmpty>
            <CommandGroup heading="Stores">
              {formattedItem.map((store) => (
                <CommandItem
                  key={store?.value}
                  onSelect={() => {
                    onStoreSelect(store);
                  }}
                  className="text-sm"
                >
                  <Store className="mr-2 h-4 w-4" />
                  {store?.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentStore?.value === store?.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
                className="cursor-pointer"
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
