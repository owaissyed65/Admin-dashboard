"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const MainNav = ({ className, ...props }) => {
  const { storId } = useParams();
  const pathName = usePathname();
  const routes = [
    {
      href: `/${storId}`,
      label: "Overview",
      active: pathName === `/${storId}`,
    },
    {
      href: `/${storId}/billboards`,
      label: "BillBoards",
      active: pathName === `/${storId}/billboards`,
    },
    {
      href: `/${storId}/categories`,
      label: "Categories",
      active: pathName === `/${storId}/categories`,
    },
    {
      href: `/${storId}/settings`,
      label: "Settings",
      active: pathName === `/${storId}/settings`,
    },
  ];
  return (
    <div
      className={cn(
        "flex items-start justify-center space-x-4 lg:space-x-6",
        className
      )}
    >
      {routes.map((val) => (
        <Link
        href={val.href}
        key={val.href}
        className={cn('text-sm transition-colors hover:text-primary',
        val.active?'text-black dark:text-white':'text-muted-foreground')}
        >
            {val.label}
        </Link>
      ))}
    </div>
  );
};

export default MainNav;
