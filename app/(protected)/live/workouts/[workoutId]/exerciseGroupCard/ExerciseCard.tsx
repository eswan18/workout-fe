import { SaveStatus } from "@/components/indicators/SaveStatusIndicator";
import SaveStatusOverlayContainer from "./SaveStatusOverlayContainer";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ExerciseWithType } from "@/lib/resources/apiTypes";
import { formatDateYMD } from "@/lib/time";

interface ExerciseWidgetProps {
  exercise: ExerciseWithType;
  saveStatus: SaveStatus;
}

export default function ExerciseCard({
  exercise,
  saveStatus,
}: ExerciseWidgetProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* This button has to be inline in this function (not a separate component) for the alert trigger to work */}
        <Card className="w-20 h-20 flex-shrink-0 cursor-pointer">
          <ExerciseCardContent exercise={exercise} saveStatus={saveStatus} />
        </Card>
      </DialogTrigger>
      <DialogContent className="flex flex-row justify-center">
        <div className="sm:w-64">
          <div className="flex flex-row justify-evenly items-start">
            <DialogHeader>
              <DialogTitle>{exercise.exercise_type_name}</DialogTitle>
            </DialogHeader>
            <span className="text-sm text-muted-foreground">
              {exercise.start_time
                ? formatDateYMD(exercise.start_time, true)
                : "unknown"}
            </span>
          </div>
          <div className="grid grid-cols-2 py-2 gap-2 items-end w-fit">
            <div className="text-2xl text-right">{exercise.weight}</div>
            <div className="text-lg text-muted-foreground">pounds</div>
            <div className="text-2xl text-right">{exercise.reps}</div>
            <div className="text-lg text-muted-foreground">reps</div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ExerciseCardContent({ exercise, saveStatus }: ExerciseWidgetProps) {
  return (
    <CardContent className="h-full flex flex-col justify-center items-center p-0">
      <SaveStatusOverlayContainer saveStatus={saveStatus} />
      <div className="text-2xl font-bold">{exercise.weight}</div>
      <div className="text-lg">
        <X size={14} className="inline-flex text-muted-foreground mr-0.5" />
        {exercise.reps}
      </div>
    </CardContent>
  );
}
