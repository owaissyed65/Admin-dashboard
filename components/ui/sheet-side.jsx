"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  ChevronsDown,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUp,
} from "lucide-react";
import StoreSwitcher from "@/components/headers/Store-Switcher";
import MainNav from "@/components/headers/Main-Nav";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme";
import { useState } from "react";

export function SheetSide({ store }) {
  const [open, setOpen] = useState(false);
  const onChange = (open) => {
    if (!open) {
      setOpen(false);
    }
  };

  return (
    <div className="grid ">
      <Sheet open={open} onOpenChange={onChange}>
        <Button variant="icon" onClick={() => setOpen(true)}>
          {!open ? (
            <ChevronsUp className="h-4 w-4" />
          ) : (
            <ChevronsDown className="h-4 w-4" />
          )}
        </Button>
        <SheetContent side="top" >
          <SheetHeader>
            <SheetTitle>Dashboard</SheetTitle>
          </SheetHeader>
          <Separator />
          <div className="grid gap-4 items-center py-4">
            <div className="flex items-center justify-between">
              <StoreSwitcher items={store} />
              <ModeToggle mobile={true} setOpen={setOpen} />
            </div>
            <Separator />
            <MainNav
              className={"flex-col px-2 items-center gap-5 "}
              mobile={true}
              setOpen={setOpen}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
