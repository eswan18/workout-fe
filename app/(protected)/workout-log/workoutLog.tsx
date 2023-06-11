import { Workout, Exercise } from "@/lib/apiTypes"

interface WorkoutLogProps {
  workout: Workout
  exercises: Array<Exercise>
}

export default function WorkoutLog({ workout, exercises }: WorkoutLogProps) {
  const wkt = JSON.stringify(workout)
  const ex = JSON.stringify(exercises)
  return (
    <div>
      <h1>Workout {workout.id}</h1>
      <p>{wkt}</p>
      <p>{ex}</p>
    </div>
  )
}