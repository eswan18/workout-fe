import { getAccessToken, getCurrentUser } from "@/lib/session";
import WorkoutLog from '../workoutLog'

const apiUrl = process.env.WORKOUT_API_URL;


async function getWorkout(id: string) {
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

type WorkoutLogPageParams = {
  workoutId: string
}

export default async function WorkoutLogPage({ params }: {params: WorkoutLogPageParams}) {
  const workoutId = params.workoutId
  return (
    <main>
      <WorkoutLog workoutId={workoutId} />
    </main>
  )
}