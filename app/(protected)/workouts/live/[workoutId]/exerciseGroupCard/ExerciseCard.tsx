import { SaveStatus } from "@/components/indicators/SaveStatusIndicator";
import SaveStatusOverlayContainer from "./SaveStatusOverlayContainer";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Trash, X } from "lucide-react";
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
import { deleteExercise } from "@/lib/resources/exercises/delete";
import { del } from "@/lib/requests";

interface ExerciseWidgetProps {
  exercise: ExerciseWithType;
  saveStatus: SaveStatus;
  editable?: boolean;
  deleteExercise?: () => void;
}

export default function ExerciseCard({
  exercise,
  saveStatus,
  editable = false,
  deleteExercise = () => {},
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
          <DialogHeader className="flex flex-row justify-between items-start gap-4 space-y-0 pt-2">
            <div className="flex flex-col gap-1 sm:gap-2">
              <DialogTitle>{exercise.exercise_type_name}</DialogTitle>
              <span className="text-sm text-muted-foreground">
                {exercise.start_time
                  ? formatDateYMD(exercise.start_time, true)
                  : "unknown"}
              </span>
            </div>
            <div className="flex flex-row gap-1 sm:gap-3 justify-end">
              {editable && (
                <>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="h-8 w-8 p-0.5"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    className="h-8 w-8 p-0.5"
                    onClick={() => deleteExercise()}
                  >
                    <Trash size={16} />
                  </Button>
                </>
              )}
            </div>
          </DialogHeader>
          <div className="flex flex-row justify-center py-4">
            <div className="w-fit grid grid-cols-2 py-2 gap-y-4 items-center">
              <div className="text-base text-muted-foreground">Weight</div>
              <div className="text-2xl text-right">{exercise.weight}</div>
              <div className="text-base text-muted-foreground">Reps</div>
              <div className="text-2xl text-right">{exercise.reps}</div>
            </div>
          </div>
          <DialogFooter className="flex flex-row justify-center sm:justify-center">
            <DialogClose asChild>
              <Button variant="outline" className="w-24">
                Done
              </Button>
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
