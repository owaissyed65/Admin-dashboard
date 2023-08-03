"use client";
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Copy, Server } from "lucide-react";
import { AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const textMap = {
  public: "Public",
  admin: "admin",
};
const VariantMap = {
  public: "secondary",
  admin: "destructive",
};

const ApiAlert = ({ title, desc, variant }) => {
  const onCopy = () => {
    navigator.clipboard.writeText(desc);
    toast.success("Api routes Copied")
  };
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center flex-col md:flex-row gap-x-2 gap-2 md:gap-0">
        {title}
        <Badge variant={VariantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between flex-col gap-2 md:flex-row md:gap-0 ">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold break-all">
          {desc}
        </code>
        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;
