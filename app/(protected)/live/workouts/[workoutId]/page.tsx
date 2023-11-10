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
  const result = await getWorkoutWithDetailsAsExerciseSets(params.workoutId);
  if (!result.success) throw result.error;
  const { workout, exerciseSets } = result.data;
  const workoutName = workout.workout_type_name || "Custom";
  metadata.title = `Live Workout: ${workoutName}`;

  const exerciseTypesResult = await getAllExerciseTypes();
  if (!exerciseTypesResult.success) throw exerciseTypesResult.error;
  const exerciseTypes = exerciseTypesResult.data;

  return (
    <LiveWorkout
      workout={workout}
      exerciseSets={exerciseSets}
      exerciseTypes={exerciseTypes}
    />
  );
}
