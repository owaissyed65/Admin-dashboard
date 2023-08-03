import { UserButton, auth } from "@clerk/nextjs";
import React from "react";
import MainNav from "@/components/headers/Main-Nav";
import StoreSwitcher from "@/components/headers/Store-Switcher";
import { redirect } from "next/navigation";
import prisma from "@/lib/prismadb";

const Navbar = async() => {
  const {userId} = auth()
  if(!userId){
    redirect('/sign-in')
  }
  const store =  await prisma?.store.findMany({
    where:{
      userId
    }
  })
  return (
    <div className="border-b">
      <div className="flex items-center p-6 gap-2 justify-center ">
        <StoreSwitcher items={store}/>
        <MainNav className='mx-6'/>
        <div className="ml-auto flex items-center">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
