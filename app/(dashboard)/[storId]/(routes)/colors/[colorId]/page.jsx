import prisma from "@/lib/prismadb";
import React from "react";
import ColorForm from "./components/color-form";

const ColorIdPage = async ({ params }) => {
  const color = await prisma.color.findUnique({
    where: {
      id: params.colorId,
    },
  });
  
  return (
    <div className="flex flex-col">
      <div className="space-y-4 flex-1 p-8 pt-6">
        <ColorForm initialData={color}/>
      </div>
    </div>
  );
};

export default ColorIdPage;
