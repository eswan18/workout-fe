import { getAccessToken } from "@/lib/session";
import { redirect } from "next/navigation";

const apiUrl = process.env.WORKOUT_API_URL;


type NewWorkoutLogParams = {
  start_time?: Date
  workout_type_id?: string
}

async function createWorkout({ start_time, workout_type_id }: NewWorkoutLogParams): Promise<string> {
  // Create a new workout and return its ID.
  const token = await getAccessToken()
  const payload = {
    status: 'in-progress',
    start_time: start_time || Date.now(),
    workout_type_id
  }

  const response = await fetch(`${apiUrl}/workouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })

  const workouts = await response.json()
  return workouts[0]['id'];
}

export default async function NewWorkoutLog({ searchParams }: { searchParams: NewWorkoutLogParams }) {
  // Just create a new workout and redirect to that workout's page.
  const workoutId = await createWorkout(searchParams);
  redirect(`workout-log/${workoutId}`)
}