import { getWorkoutWithDetailsAsExerciseGroups } from "@/lib/resources/derived/workoutWithDetails";
import { getAllExerciseTypes } from "@/lib/resources/exerciseTypes/read";
import WorkoutView from "@/app/(protected)/workouts/WorkoutView";

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
  const result = await getWorkoutWithDetailsAsExerciseGroups(params.workoutId);
  if (!result.success) throw result.error;
  const { workout, exerciseGroups } = result.data;
  const keyedExerciseGroups = exerciseGroups.map((g) => ({
    ...g,
    key: Math.random(),
  }));
  const workoutName = workout.workout_type_name || "Custom";
  metadata.title = `Live Workout: ${workoutName}`;

  const exerciseTypesResult = await getAllExerciseTypes();
  if (!exerciseTypesResult.success) throw exerciseTypesResult.error;
  const exerciseTypes = exerciseTypesResult.data;

  return (
    <WorkoutView
      workout={workout}
      exerciseGroups={keyedExerciseGroups}
      exerciseTypes={exerciseTypes}
      live={true}
    />
  );
}
