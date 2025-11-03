import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const UnRoutedmodal: React.FC<{
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: () => void;
}> = ({ children, isOpen, setIsOpen }) => {
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen()}>
      <DialogContent className="sm:max-w-160">{children}</DialogContent>
    </Dialog>
  );
};

export default UnRoutedmodal;
