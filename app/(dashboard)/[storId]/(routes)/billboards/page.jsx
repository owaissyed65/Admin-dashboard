import { format } from "date-fns";
import React from "react";
import Client from "./components/Client";
import prisma from "@/lib/prismadb";

const BillboardsPage = async ({ params }) => {
  const billBoards = await prisma.BillBoard.findMany({
    where: {
      storeId: params.storId,
    },
  });
  const formattedBillBoards = billBoards?.map((value) => ({
    id: value.id,
    label: value.label,
    createdAt: format(value.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex flex-col">
      <div className="space-y-4 flex-1 p-8 pt-6">
        <Client data={formattedBillBoards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
