import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
export const metadata = {
    title: "Store Name",
    description: "Store Name",
  };
const SetUplayout = async ({ children }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const store =await prismadb.store.findFirst({
    where: {
      userId,
    },
  });
  if (store) {
    redirect(`/${store.id}`);
  }
  return <div>{children}</div>;
};

export default SetUplayout;
