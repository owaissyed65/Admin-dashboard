import { format } from "date-fns";
import React from "react";
import Client from "./components/Client";
import prisma from "@/lib/prismadb";

const ColorsPage = async ({ params }) => {
  const colors = await prisma.color.findMany({
    where: {
      storeId: params.storId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  const formattedColors = colors?.map((value) => ({
    id: value.id,
    name: value.name,
    value: value.value,
    createdAt: format(value.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex flex-col">
      <div className="space-y-4 flex-1 p-8 pt-6">
        <Client data={formattedColors} />
      </div>
    </div>
  );
};

export default ColorsPage;
