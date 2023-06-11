import { getAccessToken, getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

const apiUrl = process.env.WORKOUT_API_URL;

async function getWorkout(id: string) {
  // Eventually, it should be possible to get to this page by passing a workout
  // ID that exists in the db. Here, we'll load the workout details and populate the page.
  const token = await getAccessToken();

  const workoutId = 'abc'
  const response = await fetch(`${apiUrl}/workouts?id=${workoutId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const workouts = await response.json();
  const workout = workouts[0]
  
  return workout;
}

async function createWorkout(): Promise<string> {
  // Create a new workout and return its ID.
  const token = await getAccessToken()
  const payload = {
    status: 'in-progress',
    start_time: Date.now()
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

export default async function NewWorkoutLog() {
  // Just create a new workout and redirect to that workout's page.
  const wktId = await createWorkout();
  redirect(`workout-log/${wktId}`)
}