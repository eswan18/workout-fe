import { getWorkoutWithDetailsAsExerciseSets } from "@/lib/resources/derived/workoutWithDetails";
import WorkoutView from "./WorkoutView";
import Head from "next/head";

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
  return (
    <>
      <Head>
        <title>Workout</title>
      </Head>
      <WorkoutView workout={workout.workout} exerciseGroups={workout.exerciseSets} />
    </>
  )
}