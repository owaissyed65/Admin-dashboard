"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children, ...props }) {
  const [isMounted, setMounted] = React.useState(false);
  React.useEffect(()=>{
    setMounted(true)
  },[])
  if(!isMounted) return null;
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
