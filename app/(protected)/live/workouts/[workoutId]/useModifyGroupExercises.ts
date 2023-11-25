import { WorkoutWithType } from "@/lib/resources/apiTypes";
import {
  ExerciseType,
  Exercise,
  StandaloneExercise,
} from "@/lib/resources/apiTypes";
import { createExercise, deleteExercise } from "@/lib/resources/exercises";

export function useModifyGroupExercises({
  exercises,
  setExercises,
  exerciseType,
  workout,
}: {
  exercises: Exercise[];
  setExercises: (exercises: Exercise[]) => void;
  exerciseType: ExerciseType;
  workout: WorkoutWithType;
}) {
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
  };
  return {
    addExercise,
    deleteExerciseById,
  };
}
