import { getAccessToken } from "@/lib/session";
import WorkoutLog from '../workoutLog'
import { Workout, Exercise } from '@/lib/apiTypes'

const apiUrl = process.env.WORKOUT_API_URL;

type WorkoutData = {
  workout: Workout
  exercises: Array<Exercise>
}


async function getWorkoutData(id: string): Promise<WorkoutData> {
  const token = await getAccessToken();

  const workoutResponse = await fetch(`${apiUrl}/workouts?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const workouts = await workoutResponse.json();
  const workout = workouts[0]
  
  const exercisesResponse = await fetch(`${apiUrl}/exercises?workout_id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const exercises = await exercisesResponse.json()

  return { workout, exercises }
}

type WorkoutLogPageParams = {
  workoutId: string
}

export default async function WorkoutLogPage({ params }: {params: WorkoutLogPageParams}) {
  const workoutId = params.workoutId
  const { workout, exercises } = await getWorkoutData(workoutId)
  return (
    <main>
      <WorkoutLog workout={ workout } exercises={ exercises } />
    </main>
  )
}