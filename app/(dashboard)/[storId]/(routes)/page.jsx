import prisma from "@/lib/prismadb";
import React from "react";

const Dashboard = async ({ params }) => {
  const store = await prisma.store.findFirst({
    where: {
      id: params.storId,
    },
  });
  return <div>This is Dashboard{store?.name}</div>;
};

export default Dashboard;
