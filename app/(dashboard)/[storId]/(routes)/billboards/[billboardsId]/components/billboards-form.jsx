"use client";
import AlertModal from "@/components/modal/Alert-Modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
import ImageUploader from "@/components/ui/image-uploader";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import useOrigin from "@/hooks/use-Origin";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

const BillBoardsforms = ({ initialData }) => {
  const origin = useOrigin();
  const params = useParams();
  const router = useRouter();
  const title = initialData ? "Edit BillBoard" : "Create BillBoard";
  const desc = initialData ? "Edit a BillBoard" : "Add a new BillBoard";
  const toastUpdated = initialData
    ? "BillBoard Updated."
    : "BillBoard Created.";
  const action = initialData ? "Save Changes" : "Create";
  const formSchema = z.object({
    label: z.string().min(2, {
      message: "Use minimum 2 word",
    }),
    imageUrl: z.string().min(2),
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storId}/billboards/${params.billboardsId}`,
          data
        );
        router.refresh();
      } else {
        await axios.post(`/api/${params.storId}/billboards`, data);
      }
      router.refresh();
      toast.success(toastUpdated);
      router.push(`/${params.storId}/billboards`)
    } catch (error) {
      toast.error("Internal server Error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storId}/billboards/${params.billboardsId}`
      );
      toast.success("Billboard Deleted");
      router.push(`/${params.storId}/billboards`)
    } catch (error) {
      toast.error(
        "Make Sure you removed all categories using this billboards first."
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
        onClose={() => setOpen(false)}
        onConfirm={() => {
          onDelete();
        }}
        loading={loading}
      />
      <div className="flex items-center justify-between mt-3 px-4">
        <Heading title={title} desc={desc} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => {
              setOpen(true);
            }}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator className="mt-2" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 w-full px-6 mb-3"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Background Image</FormLabel>
                  <FormControl>
                    <ImageUploader
                      value={field?.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                    />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="BillBoard Label"
                      {...field}
                      className="w-auto"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="mt-3 " type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default BillBoardsforms;
