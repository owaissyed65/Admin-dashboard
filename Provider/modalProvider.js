'use client'
import { StoreModal } from "@/components/modal/Store-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [mounted, isMounted] = useState(false);
  useEffect(() => {
    isMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <>
      <StoreModal />
    </>
  );
};
