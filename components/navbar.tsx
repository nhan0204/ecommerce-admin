import { useAuth, UserButton } from "@clerk/nextjs";
import React from "react";
import { MainNav } from "@/components/main-nav";
import StoreSwithcer from "@/components/store-switcher";
import { redirect } from "next/navigation";
import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { ThemeToggle } from "./theme-toggle";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = async() => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      UserId: userId
    }
  })

  return (
    <div className="border-b px-2">
      <div className="flex items-center h-16 px-4">
        <StoreSwithcer items={stores} />
        <MainNav className="mx-8" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle/>
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
