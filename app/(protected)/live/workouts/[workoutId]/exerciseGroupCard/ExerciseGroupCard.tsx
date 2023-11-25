"use client";

import {
  Exercise,
  ExerciseType,
  ExerciseWithType,
  StandaloneExercise,
  WorkoutWithType,
} from "@/lib/resources/apiTypes";
import { createExercise } from "@/lib/resources/exercises";
import CreateNewExerciseButton from "./CreateNewExerciseButton";
import ExerciseCard from "./ExerciseCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";
import { deleteExercise } from "@/lib/resources/exercises/delete";

type ExerciseGroupWidgetProps = {
  exerciseType: ExerciseType;
  exercises: (Exercise | LoadingExercise)[];
  setExercises: (exercises: (Exercise | LoadingExercise)[]) => void;
  workout: WorkoutWithType;
  editable?: boolean;
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
  setExercises,
  workout,
  editable = false,
  supportsAddingExercise = false,
}: ExerciseGroupWidgetProps) {
  const addExercise = (exercise: StandaloneExercise) => {
    const newExercise: Exercise = {
      ...exercise,
      exercise_type_id: exerciseType.id as string,
      workout_id: workout.id,
    };
    createExercise(newExercise).then((result) => {
      if (!result.success) {
        return;
      }
      const exercise = result.data;
      setExercises([...exercises, exercise]);
    });
  };
  const deleteExerciseById = (exerciseId: string) => {
    const newExercises = exercises.filter(
      (ex) => !("id" in ex && ex.id === exerciseId),
    );
    setExercises(newExercises);
    deleteExercise(exerciseId);
  }
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
          return (
            <ExerciseCard
              exercise={ex}
              saveStatus="saved"
              key={ex.id}
              editable={editable}
              deleteExercise={() => deleteExerciseById(ex.id)}
            />
          );
        })}
        {supportsAddingExercise && (
          <CreateNewExerciseButton
            exerciseTypeName={exerciseType.name}
            addExercise={addExercise}
          />
        )}
      </CardContent>
    </Card>
  );
}
