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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

const ColorForm = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();
  const title = initialData ? "Edit color" : "Create color";
  const desc = initialData ? "Edit a color" : "Add a new color";
  const toastUpdated = initialData ? "Color Updated." : "color Created.";
  const action = initialData ? "Save Changes" : "Create";
  const formSchema = z.object({
    name: z.string().min(2),
    value: z.string().min(4).regex(/^#/, {
      message: "String can only be valid hex code",
    }),
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/${params.storId}/colors/${params.colorId}`, data);
        router.refresh();
      } else {
        await axios.post(`/api/${params.storId}/colors`, data);
      }
      router.refresh();
      toast.success(toastUpdated);
      router.push(`/${params.storId}/colors`);
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
      await axios.delete(`/api/${params.storId}/colors/${params.colorId}`);
      toast.success("Colors Deleted");
      router.push(`/${params.storId}/colors`);
      router.refresh()
    } catch (error) {
      toast.error("Make Sure you removed all products using this color first.");
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
                      placeholder="Color name"
                      {...field}
                      className="w-auto"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Input
                        disabled={loading}
                        placeholder="Example #ffffff"
                        {...field}
                        className="w-auto"
                      />
                      <div
                        className="h-6 w-6 border rounded-full "
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
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

export default ColorForm;
