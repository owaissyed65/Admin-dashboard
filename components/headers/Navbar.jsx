import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import MainNav from "@/components/headers/Main-Nav";
import StoreSwitcher from "@/components/headers/Store-Switcher";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";
import { ModeToggle } from "@/components/theme";
import { SheetSide } from "../ui/sheet-side";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prisma?.store.findMany({
    where: {
      userId,
    },
  });
  return (
    <div className="border-b ">
      <div className="hidden md:flex items-center p-6 gap-2 justify-center">
        <StoreSwitcher items={store} />
        <MainNav className="mx-6 space-x-4 lg:space-x-6 " />
        <div className="ml-auto flex items-center gap-4">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      <div className="md:hidden flex items-center justify-end">
        <SheetSide store={store} />
        <UserButton afterSignOutUrl="/" className="ml-2"/>
      </div>
    </div>
  );
};

export default Navbar;
