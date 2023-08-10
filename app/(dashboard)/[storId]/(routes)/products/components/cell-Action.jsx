"use client";
import AlertModal from "@/components/modal/Alert-Modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import React, { useState } from "react";
import { toast } from "react-hot-toast";

const CellAction = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
  const onCopy = (id) => {
    navigator.clipboard.writeText(id);
    toast.success("Product Id is Copied.");
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storId}/products/${data.id}`
      );
      router.refresh()
      toast.success("Product Deleted.");
    } catch (error) {
      toast.error(
        "Something went wrong"
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
    <AlertModal
    isOpen={open}
    onClose={()=>setOpen(false)}
    onConfirm={onDelete}
    loading={loading}
    />
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            onCopy(data.id);
          }}
          className="cursor-pointer"
        >
          <Copy className="h-4 w-4 mr-2" />
          Copy
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push(`/${params.storId}/products/${data.id}`)}
        >
          <Edit className="h-4 w-4 mr-2" />
          Update
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={()=>setOpen(true)}>
          <Trash className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
};

export default CellAction;
