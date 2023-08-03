"use client";
import AlertModal from "@/components/modal/Alert-Modal";
import ApiAlert from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import Heading from "@/components/ui/heading";
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

const Settingforms = ({ initialData }) => {
  const origin = useOrigin();
  const params = useParams();
  const router = useRouter();
  const formSchema = z.object({
    name: z.string().min(2, {
      message: "Use minimum 2 word",
    }),
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await axios.patch(`/api/store/${params.storId}`, data);
      router.refresh();
      toast.success("Store updated.");
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
      await axios.delete(`/api/store/${params.storId}`);
      router.push("/");
      toast.success("Store Deleted");
    } catch (error) {
      toast.error("Make Sure you removed all products and categories first");
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
        <Heading title={"Setting"} desc={"manage store preference"} />
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
      </div>
      <Separator className="mt-2" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 w-full px-6 mb-3"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store name"
                      {...field}
                      className="w-auto"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="mt-3 " type="submit">
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <div className="mt-3 px-6">
        <ApiAlert
          title={"NEXT_PUBLIC_API_URL"}
          variant={"public"}
          desc={`${origin && origin}/api/store/${params.storId}`}
        />
      </div>
    </>
  );
};

export default Settingforms;
