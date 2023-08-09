"use client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { columns } from "./columns";
import ApiList from "@/components/ui/api-list";

const Client = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between items-center">
        <Heading
          title={`Product${data?.length>0?'s':''} (${data?.length})`}
          desc={"Manage products for you Store"}
        />
        <Button
          onClick={() => {
            router.push(`/${params.storId}/products/new`);
          }}
        >
          {" "}
          <Plus className="mr-2 h-4 w-4" />
          <span>Add New</span>
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Separator />
      <Heading title="Api" desc="Call for api"/>
      <ApiList entityName={'products'} entityNameId={'productId'}/>
    </>
  );
};

export default Client;
