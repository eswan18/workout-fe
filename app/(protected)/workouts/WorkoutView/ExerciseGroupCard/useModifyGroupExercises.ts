import { WorkoutWithType } from "@/lib/resources/apiTypes";
import {
  ExerciseType,
  Exercise,
  StandaloneExercise,
} from "@/lib/resources/apiTypes";
import {
  createExercise,
  deleteExercise,
  overwriteExercise,
} from "@/lib/resources/exercises";

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
    const newExercises = exercises.filter((ex) => ex.id != exerciseId);
    deleteExercise(exerciseId).then((result) => {
      if (!result.success) {
        return;
      }
      setExercises(newExercises);
    });
  };
  const updateExercise = (exercise: Exercise) => {
    const newExercises = exercises.map((ex) =>
      ex.id === exercise.id ? exercise : ex,
    );
    overwriteExercise({ id: exercise.id as string, exercise }).then(
      (result) => {
        if (!result.success) {
          return;
        }
        setExercises(newExercises);
      },
    );
  };
  return {
    addExercise,
    deleteExerciseById,
    updateExercise,
  };
}
