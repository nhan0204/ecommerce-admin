"use client";

import { useEffect, useState } from "react";

import { StoreModal } from "@/components/modals/store-modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, usePathname } from "next/navigation";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  const storeModal = useStoreModal();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // prevent hydration error(break sync between CR and SSR)
  if (!isMounted) {
    return null;
  }

  return (
    <>
      <StoreModal />
    </>
  );
};
