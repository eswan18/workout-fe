import { getWorkoutWithDetailsAsExerciseSets } from "@/lib/resources/derived/workoutWithDetails";
import { getAllExerciseTypes } from "@/lib/resources/exerciseTypes/getExerciseTypes";
import LiveWorkout from "./LiveWorkout";

export const metadata = {
  title: "Live Workout",
};

type PageParams = {
  workoutId: string;
};

export default async function LiveWorkoutPage({
  params,
}: {
  params: PageParams;
}) {
  // This component just pulls the data and then passes the rest to the client component.
  const workout = await getWorkoutWithDetailsAsExerciseSets(params.workoutId);
  const exerciseTypes = await getAllExerciseTypes();
  const workoutName = workout.workout.workout_type_name || "Custom";
  metadata.title = `Live Workout: ${workoutName}`;
  return (
    <LiveWorkout
      workout={workout.workout}
      exerciseSets={workout.exerciseSets}
      exerciseTypes={exerciseTypes}
    />
  );
}
