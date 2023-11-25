import { getWorkoutWithDetailsAsExerciseSets } from "@/lib/resources/derived/workoutWithDetails";
import WorkoutView from "../WorkoutView";
import { ExerciseType } from "@/lib/resources/apiTypes";

export const metadata = {
  title: "Workout View",
};

type PageParams = {
  workoutId: string;
};

export default async function WorkoutPage({ params }: { params: PageParams }) {
  // This component just pulls the data and then passes the rest to the client component.
  const result = await getWorkoutWithDetailsAsExerciseSets(params.workoutId);
  if (!result.success) throw result.error;
  const { workout, exerciseSets } = result.data;
  const workoutName = workout.workout_type_name || "Custom";
  metadata.title = `Workout: ${workoutName}`;
  // No need to fetch exercise types for a non-live workout.
  const exerciseTypes: ExerciseType[] = [];
  return (
    <WorkoutView
      workout={workout}
      exerciseSets={exerciseSets}
      exerciseTypes={exerciseTypes}
      live={false}
    />
  );
}
