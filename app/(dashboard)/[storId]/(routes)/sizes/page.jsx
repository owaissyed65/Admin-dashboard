import { format } from "date-fns";
import React from "react";
import Client from "./components/Client";
import prisma from "@/lib/prismadb";

const SizesPage = async ({ params }) => {
  const sizes = await prisma.size.findMany({
    where: {
      storeId: params.storId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  const formattedSizes = sizes?.map((value) => ({
    id: value.id,
    name: value.name,
    value: value.value,
    createdAt: format(value.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex flex-col">
      <div className="space-y-4 flex-1 p-8 pt-6">
        <Client data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
