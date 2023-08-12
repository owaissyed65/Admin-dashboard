import { format } from "date-fns";
import React from "react";
import Client from "./components/Client";
import prisma from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

const BillboardsPage = async ({ params }) => {
  const orders = await prisma.order.findMany({
    where: {
      storeId: params.storId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
  const formattedOrders = orders?.map((value) => ({
    id: value.id,
    phone: value.phone,
    address: value.address,
    isPaid: value.isPaid,
    products: value.orderItems.map((item) => item.product.name).join(", "),
    totalPrice: formatter.format(
      value.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    createdAt: format(value.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex flex-col">
      <div className="space-y-4 flex-1 p-8 pt-6">
        <Client data={formattedOrders} />
      </div>
    </div>
  );
};

export default BillboardsPage;
