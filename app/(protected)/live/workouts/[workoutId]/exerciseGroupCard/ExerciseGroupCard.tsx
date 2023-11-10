"use client";

import { Exercise, ExerciseType } from "@/lib/resources/apiTypes";
import CreateNewExerciseWidget from "./CreateNewExerciseWidget";
import ExerciseWidget from "./ExerciseWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";

type ExerciseGroupWidgetProps = {
  exerciseType: ExerciseType;
  exercises: (Exercise | LoadingExercise)[];
  onClickCreateNewExercise: () => void;
  onClickEditExercise: (exerciseId: string) => void;
};

export type LoadingExercise = {
  id: number;
  isLoading: true;
};

export type ExerciseOrLoading = Exercise | LoadingExercise;

export default function ExerciseGroupCard({
  exerciseType,
  exercises,
  onClickCreateNewExercise,
  onClickEditExercise,
}: ExerciseGroupWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Dumbbell size={36} className="inline mr-2" /> {exerciseType.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row justify-left gap-2 overflow-x-scroll">
        {exercises.map((ex) => {
          if ("isLoading" in ex) {
            return;
          }
          return (
            <ExerciseWidget
              weight={ex.weight as number}
              reps={ex.reps as number}
              saveStatus="saved"
              onEditButtonClick={() => onClickEditExercise(ex.id as string)}
              key={ex.id}
            />
          );
        })}
        <CreateNewExerciseWidget onClick={onClickCreateNewExercise} />
      </CardContent>
    </Card>
  );
}
