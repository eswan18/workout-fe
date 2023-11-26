"use client";

import { useState } from "react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ExerciseTypeTable from "./ExerciseTypeTable";
import CreateExerciseTypeDialogContent from "@/components/dialogs/CreateExerciseTypeDialogContent";
import { ExerciseType } from "@/lib/resources/apiTypes";
import { createExerciseType } from "@/lib/resources/exerciseTypes";

export default function ExerciseTypeDisplay({
  exerciseTypes,
}: {
  exerciseTypes: ExerciseType[];
}) {
  const [open, setOpen] = useState(false);
  const [excTps, setExcTps] = useState<ExerciseType[]>(exerciseTypes);

  const createExerciseTypeAndUpdateState = (exerciseType: ExerciseType) => {
    createExerciseType(exerciseType).then((result) => {
      if (!result.success) throw result.error;
      setExcTps([...excTps, result.data]);
    });
  };

  return (
    <>
      <div className="flex flex-row justify-start items-center gap-2 mt-14 mb-4">
        <h2 className="text-2xl">Exercise Types</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm" className="ml-2">
              New <Plus size={18} className="ml-1" />
            </Button>
          </DialogTrigger>
          <CreateExerciseTypeDialogContent
            createExerciseType={createExerciseTypeAndUpdateState}
            closeDialog={() => setOpen(false)}
          />
        </Dialog>
      </div>
      <ExerciseTypeTable exerciseTypes={excTps} />
    </>
  );
}
