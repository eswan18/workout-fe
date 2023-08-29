import { getWorkoutWithDetailsAsExerciseSets } from "@/lib/resources/derived/workoutWithDetails";
import LiveWorkout from "./LiveWorkout";

type PageParams = {
  workoutId: string
}

export default async function LiveWorkoutPage({ params }: {params: PageParams}) {
  // This component just pulls the data and then passes the rest to the client component.
  const workout = await getWorkoutWithDetailsAsExerciseSets(params.workoutId);
  return <LiveWorkout workout={workout.workout} exerciseSets={workout.exerciseSets} />
}