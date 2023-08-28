import { getWorkoutWithDetails } from "@/lib/resources/derived/workoutWithDetails";
import ExerciseWidget from "./ExerciseWidget";

type PageParams = {
  workoutId: string
}

export default async function WorkoutLogPage({ params }: {params: PageParams}) {
  const workoutDetails = await getWorkoutWithDetails(params.workoutId);
  console.log(JSON.stringify(workoutDetails))
  return (
    <main>
      <h1>Workout Log</h1>
      <p>Workout ID: {workoutDetails.workout.id} </p>
      { workoutDetails.exercises.map((exercise) => <ExerciseWidget key={exercise.id }/>) }
    </main>
  )
}