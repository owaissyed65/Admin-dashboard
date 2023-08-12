"use client";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { columns } from "./columns";

const Client = ({ data }) => {
  return (
    <>
      <Heading
        title={`Orders (${data?.length})`}
        desc={"Manage orders for you Store"}
      />
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
      <Separator />
    </>
  );
};

export default Client;
