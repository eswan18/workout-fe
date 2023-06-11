import { getAccessToken } from "@/lib/session";
import WorkoutLog from './workoutLog'
import { Workout, WorkoutType, Exercise, ExerciseType } from '@/lib/apiTypes'

const apiUrl = process.env.WORKOUT_API_URL;

type WorkoutLogData = {
  workout: Workout
  workoutType?: WorkoutType
  exercises: Array<Exercise>
  exerciseTypes: Array<ExerciseType>
}


async function getWorkoutLogData(id: string): Promise<WorkoutLogData> {
  const token = await getAccessToken();

  // Get details about the workout.
  const workoutResponse = await fetch(`${apiUrl}/workouts?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const workouts = await workoutResponse.json();
  const workout = workouts[0]
  
  // If this workout has a workout type set, fetch details about it.
  let workoutType: WorkoutType | undefined = undefined
  if (workout.id) {
    const workoutTypeResponse = await fetch(`${apiUrl}/workout_types?id=${workout.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    const workoutTypes = await workoutTypeResponse.json()
    workoutType = workoutTypes[0]
  }
  
  // Get all exercises in this workout.
  const exercisesResponse = await fetch(`${apiUrl}/exercises?workout_id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const exercises = await exercisesResponse.json()

  // Get all exercise types available to this user
  const exerciseTypesResponse = await fetch(`${apiUrl}/exercise_types`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const exerciseTypes = await exerciseTypesResponse.json()

  return { workout, workoutType, exercises, exerciseTypes }
}

type WorkoutLogPageParams = {
  workoutId: string
}

export default async function WorkoutLogPage({ params }: {params: WorkoutLogPageParams}) {
  const workoutId = params.workoutId
  const { workout, workoutType, exercises, exerciseTypes } = await getWorkoutLogData(workoutId)
  return (
    <main>
      <WorkoutLog workout={ workout } workoutType={ workoutType } exercises={ exercises } exerciseTypes={ exerciseTypes } />
    </main>
  )
}