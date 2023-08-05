import { format } from "date-fns";
import React from "react";
import Client from "./components/Client";
import prisma from "@/lib/prismadb";

const CategoriesPage = async ({ params }) => {
  const categories = await prisma.category.findMany({
    where: {
      storeId: params.storId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  const formattedCategories = categories?.map((value) => ({
    id: value.id,
    name: value.name,
    billboardLabel: value.billboard.label,
    createdAt: format(value.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex flex-col">
      <div className="space-y-4 flex-1 p-8 pt-6">
        <Client data={formattedCategories} />
      </div>
    </div>
  );
};

export default CategoriesPage;
