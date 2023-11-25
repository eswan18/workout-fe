"use client";

import { Button } from "@/components/ui/button";
import CreateNewExerciseDialogContentForm from "./CreateNewExerciseDialogContentForm";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { PlusSquare } from "lucide-react";
import { useState } from "react";
import { StandaloneExercise } from "@/lib/resources/apiTypes";

export default function CreateNewExerciseButton({
  exerciseTypeName,
  addExercise,
}: {
  exerciseTypeName: string;
  addExercise: (exercise: StandaloneExercise) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* This button has to be inline in this function (not a separate component) for the alert trigger to work */}
        <Button
          className="w-20 h-20 flex flex-col flex-shrink-0 justify-center items-center p-0"
          title="Record new set"
          variant="secondary"
        >
          <PlusSquare size={48} strokeWidth={1.2} className="p-0 m-0" />
        </Button>
      </DialogTrigger>
      <CreateNewExerciseDialogContentForm
        exerciseTypeName={exerciseTypeName}
        addExercise={addExercise}
        closeDialog={() => setOpen(false)}
      />
    </Dialog>
  );
}
