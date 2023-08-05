import prisma from "@/lib/prismadb";
import React from "react";
import CategoryForm from "./components/category-form";

const CategoryIdPage = async ({ params }) => {
  const category = await prisma.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  const billboard = await prisma.BillBoard.findMany({
    where: {
      storeId: params.storId,
    },
  });
  return (
    <div className="flex flex-col">
      <div className="space-y-4 flex-1 p-8 pt-6">
        <CategoryForm initialData={category} billboard={billboard} />
      </div>
    </div>
  );
};

export default CategoryIdPage;
