import { getWorkoutWithDetailsAsExerciseSets } from "@/lib/resources/derived/workoutWithDetails";
import WorkoutView from "./WorkoutView";

export const metadata = {
  title: 'Workout View',
}

type PageParams = {
  workoutId: string
}

export default async function WorkoutPage({ params }: {params: PageParams}) {
  // This component just pulls the data and then passes the rest to the client component.
  const workout = await getWorkoutWithDetailsAsExerciseSets(params.workoutId);
  const workoutName = workout.workout.workout_type_name || "Custom";
  metadata.title = `Workout: ${workoutName}`
  return <WorkoutView workout={workout.workout} exerciseGroups={workout.exerciseSets} />
}