import { format } from "date-fns";
import React from "react";
import Client from "./components/Client";
import prisma from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

const ProductsPage = async ({ params }) => {
  const products = await prisma.product.findMany({
    where: {
      storeId: params.storId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  const formattedProducts = products?.map((value) => ({
    id: value.id,
    name: value.name,
    isFeatured: value.isFeatured,
    isArchived: value.isArchived,
    price: formatter.format(value?.price.toNumber()), // value.price,
    category: value.category.name,
    size: value.size.name,
    color: value.color.value ,
    createdAt: format(value.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex flex-col">
      <div className="space-y-4 flex-1 p-8 pt-6">
        <Client data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
