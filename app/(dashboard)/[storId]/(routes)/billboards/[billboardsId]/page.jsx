import prisma from "@/lib/prismadb";
import React from "react";
import BillBoardsforms from "./components/billboards-form";

const BillBoardIdPage = async ({ params }) => {
  const billboard = await prisma.BillBoard.findUnique({
    where: {
      id: params.billboardsId,
    },
  });
  
  return (
    <div className="flex flex-col">
      <div className="space-y-4 flex-1 p-8 pt-6">
        <BillBoardsforms initialData={billboard}/>
      </div>
    </div>
  );
};

export default BillBoardIdPage;
