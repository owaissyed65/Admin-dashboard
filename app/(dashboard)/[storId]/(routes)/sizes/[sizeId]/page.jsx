import prisma from "@/lib/prismadb";
import React from "react";
import SizeForms from "./components/size-form";

const SizeIdPage = async ({ params }) => {
  const sizes = await prisma.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });
  
  return (
    <div className="flex flex-col">
      <div className="space-y-4 flex-1 p-8 pt-6">
        <SizeForms initialData={sizes}/>
      </div>
    </div>
  );
};

export default SizeIdPage;
