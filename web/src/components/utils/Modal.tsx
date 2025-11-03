"use client";
import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";

const Modal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const handleOpenchange = () => router.back();
  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenchange}>
      <DialogContent className="sm:max-w-160">{children}</DialogContent>
    </Dialog>
  );
};

export default Modal;
