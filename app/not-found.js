import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Not Found",
};

const notFound = () => {
   
  return (
    <div className="flex flex-col justify-center items-center relative h-full gap-8">
      <h1 className="text-4xl font-extrabold">OOP's</h1>
      <Separator className="w-[60%]" />
      <div className="text-lg flex items-center gap-3 flex-col">
        <span className="text-muted-foreground font-bold">Not Found</span>
        <span className="text-muted-foreground text-[16px]">
          The page you are requested is not found
        </span>
        <span className="text-blue-600 underline text-sm">
          <Link href={"/"}> Redirect back to dashboard</Link>
        </span>
      </div>
    </div>
  );
};

export default notFound;
