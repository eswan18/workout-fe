"use client";

import { Exercise, ExerciseType } from "@/lib/resources/apiTypes";
import CreateNewExerciseButton from "./CreateNewExerciseButton";
import ExerciseCard from "./ExerciseCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";

type ExerciseGroupWidgetProps = {
  exerciseType: ExerciseType;
  exercises: (Exercise | LoadingExercise)[];
  onAddExercise: ({ reps, weight }: { reps: number; weight: number }) => void;
  onClickEditExercise: (exerciseId: string) => void;
  supportsAddingExercise: boolean;
};

export type LoadingExercise = {
  id: number;
  isLoading: true;
};

export type ExerciseOrLoading = Exercise | LoadingExercise;

export default function ExerciseGroupCard({
  exerciseType,
  exercises,
  onAddExercise,
  onClickEditExercise,
  supportsAddingExercise = false,
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
            <ExerciseCard
              weight={ex.weight as number}
              reps={ex.reps as number}
              saveStatus="saved"
              onEditButtonClick={() => onClickEditExercise(ex.id as string)}
              key={ex.id}
            />
          );
        })}
        { supportsAddingExercise && <CreateNewExerciseButton
          exerciseTypeName={exerciseType.name}
          onAddExercise={onAddExercise}
        /> }
      </CardContent>
    </Card>
  );
}
