import { Workout, WorkoutType, Exercise, ExerciseType } from '@/lib/apiTypes'

interface WorkoutLogProps {
  workout: Workout
  workoutType?: WorkoutType
  exercises: Array<Exercise>
  exerciseTypes: Array<ExerciseType>
}

export default function WorkoutLog({ workout, workoutType, exercises, exerciseTypes }: WorkoutLogProps) {
  const wkt = JSON.stringify(workout)
  const ex = JSON.stringify(exercises)
  console.dir(workout)
  console.dir(workoutType)
  console.dir(exercises)
  console.dir(exerciseTypes)
  return (
    <div>
      <h1>Workout {workout.id}</h1>
      <p>{wkt}</p>
      <p>{ex}</p>
    </div>
  )
}