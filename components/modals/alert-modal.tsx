"use client";

import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import React, { useEffect, useState } from "react";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCofirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onCofirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Modal
        className="text-left"
        title="Are you sure?"
        description="This acction cannot be undone."
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="pt-5 space-x-2 flex items-center justify-end w-full">
          <Button disabled={loading} variant="outline" onClick={onClose}>
            Cancle
          </Button>

          <Button disabled={loading} variant="destructive" onClick={onCofirm}>
            Continue
          </Button>
        </div>
      </Modal>
    </>
  );
};
