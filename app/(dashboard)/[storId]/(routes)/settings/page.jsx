import React from "react";
import Settingforms from "./components/Setting-forms";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";

const SettingPage = async ({ params }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const store = await prisma.store.findFirst({
    where: {
      userId,
      id: params.storId,
    },
  });
  if (!store) {
    redirect("/");
  }
  return (
    <div>
      <Settingforms initialData={store} />
    </div>
  );
};

export default SettingPage;
