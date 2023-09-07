import { getWorkoutWithDetailsAsExerciseSets } from "@/lib/resources/derived/workoutWithDetails";
import WorkoutView from "./WorkoutView";

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
  return <WorkoutView workout={workout} exerciseGroups={exerciseSets} />;
}
