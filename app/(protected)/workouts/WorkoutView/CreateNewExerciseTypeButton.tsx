import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ExerciseType } from "@/lib/resources/apiTypes";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import CreateExerciseTypeDialogContent from "@/components/dialogs/CreateExerciseTypeDialogContent";

export default function CreateNewExerciseTypeButton({
  createExerciseType,
}: {
  createExerciseType: (exerciseType: ExerciseType) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* This button has to be inline in this function (not a separate component) for the alert trigger to work */}
        <Button variant="secondary">Add new exercise type</Button>
      </DialogTrigger>
      <CreateExerciseTypeDialogContent
        createExerciseType={createExerciseType}
        closeDialog={() => setOpen(false)}
      />
    </Dialog>
  );
}
