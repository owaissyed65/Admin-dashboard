"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { columns } from "./columns";
import ApiList from "@/components/ui/api-list";

const Client = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Colors (${data?.length})`}
          desc={"Manage colors for you Store"}
        />
        <Button
          onClick={() => {
            router.push(`/${params.storId}/colors/new`);
          }}
        >
          {" "}
          <Plus className="mr-2 h-4 w-4" />
          <span>Add New</span>
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Separator />
      <Heading title="Api" desc="Api Call for colors"/>
      <ApiList entityName={'colors'} entityNameId={'colorId'}/>
    </>
  );
};

export default Client;
