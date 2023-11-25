"use client";

import {
  Exercise,
  ExerciseType,
  ExerciseWithType,
  WorkoutWithType,
} from "@/lib/resources/apiTypes";
import CreateNewExerciseButton from "./CreateNewExerciseButton";
import ExerciseCard from "./ExerciseCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";
import { useModifyGroupExercises } from "../useModifyGroupExercises";

type ExerciseGroupWidgetProps = {
  exerciseType: ExerciseType;
  exercises: Exercise[];
  setExercises: (exercises: Exercise[]) => void;
  workout: WorkoutWithType;
  editable?: boolean;
  supportsAddingExercise: boolean;
};

export default function ExerciseGroupCard({
  exerciseType,
  exercises,
  setExercises,
  workout,
  editable = false,
  supportsAddingExercise = false,
}: ExerciseGroupWidgetProps) {
  const { addExercise, deleteExerciseById } = useModifyGroupExercises({
    exercises,
    setExercises,
    workout,
    exerciseType,
  });
  const exercisesWithTypes: ExerciseWithType[] = exercises.map((ex) => {
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
        {exercisesWithTypes.map((ex) => (
          <ExerciseCard
            exercise={ex}
            saveStatus="saved"
            key={ex.id}
            editable={editable}
            deleteExercise={() => deleteExerciseById(ex.id)}
          />
        ))}
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
