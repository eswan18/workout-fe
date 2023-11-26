"use client";

import {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function DestructiveConfirmDialogContent({
  closeDialog,
  action,
  titleText = "Are you sure?",
  bodyText,
  buttonText = "Delete",
}: {
  closeDialog: () => void;
  action: () => void;
  titleText?: string;
  bodyText?: string;
  buttonText?: string;
}) {
  const handleConfirm = () => {
    action();
    closeDialog();
  };
  return (
    <DialogContent className="flex flex-row justify-center">
      <div className="sm:w-64">
        <DialogHeader>
          <DialogTitle>{titleText}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {bodyText && <p className="mb-4">{bodyText}</p>}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleConfirm}>
            {buttonText}
          </Button>
        </DialogFooter>
      </div>
    </DialogContent>
  );
}
