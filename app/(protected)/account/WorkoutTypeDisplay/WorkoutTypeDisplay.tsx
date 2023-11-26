"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import WorkoutTypeTable from "./WorkoutTypeTable";
import { WorkoutType } from "@/lib/resources/apiTypes";
import { createWorkoutType } from "@/lib/resources/workoutTypes";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import CreateWorkoutTypeDialogContent from "@/components/dialogs/CreateWorkoutTypeDialogContent";

export default function WorkoutTypeDisplay({
  workoutTypes,
}: {
  workoutTypes: WorkoutType[];
}) {
  const [open, setOpen] = useState(false);
  const [wktTps, setWktTps] = useState<WorkoutType[]>(workoutTypes);

  const createWorkoutTypeAndUpdateState = (workoutType: WorkoutType) => {
    createWorkoutType(workoutType).then((result) => {
      if (!result.success) throw result.error;
      setWktTps([...wktTps, result.data]);
    });
  };

  return (
    <>
      <div className="flex flex-row justify-start items-center gap-2 mt-14 mb-4">
        <h2 className="text-2xl">Workout Types</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" size="sm" className="ml-2">
              New <Plus size={18} className="ml-1" />
            </Button>
          </DialogTrigger>
          <CreateWorkoutTypeDialogContent
            closeDialog={() => setOpen(false)}
            createWorkoutType={createWorkoutTypeAndUpdateState}
            workoutTypes={workoutTypes}
          />
        </Dialog>
      </div>
      <WorkoutTypeTable workoutTypes={wktTps} />
    </>
  );
}
