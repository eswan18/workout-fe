"use client";

import {
  Exercise,
  ExerciseType,
  ExerciseWithType,
} from "@/lib/resources/apiTypes";
import CreateNewExerciseButton from "./CreateNewExerciseButton";
import ExerciseCard from "./ExerciseCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";

type ExerciseGroupWidgetProps = {
  exerciseType: ExerciseType;
  exercises: (Exercise | LoadingExercise)[];
  onAddExercise: ({ reps, weight }: { reps: number; weight: number }) => void;
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
  supportsAddingExercise = false,
}: ExerciseGroupWidgetProps) {
  const exercisesWithTypes: ExerciseWithType[] = exercises
    .filter((ex): ex is Exercise => !("isLoading" in ex))
    .map((ex) => {
      return {
        ...ex,
        id: ex.id as string,
        user_id: ex.user_id as string,
        exercise_type_name: exerciseType.name,
        exercise_type_id: exerciseType.id as string,
        exercise_type_owner_user_id: exerciseType.owner_user_id,
      };
    });
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Dumbbell size={36} className="inline mr-2" /> {exerciseType.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row justify-left gap-2 overflow-x-scroll">
        {exercisesWithTypes.map((ex) => {
          if ("isLoading" in ex) {
            return;
          }
          return <ExerciseCard exercise={ex} saveStatus="saved" key={ex.id} />;
        })}
        {supportsAddingExercise && (
          <CreateNewExerciseButton
            exerciseTypeName={exerciseType.name}
            onAddExercise={onAddExercise}
          />
        )}
      </CardContent>
    </Card>
  );
}
