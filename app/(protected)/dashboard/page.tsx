import { getAccessToken } from "@/lib/session";
import { getWorkoutTypes } from "@/lib/resources/workoutTypes/getWorkoutTypes";
import { WorkoutType } from "@/lib/resources/apiTypes";
import NewWorkoutPanel from "./NewWorkoutPanel";


const apiUrl = process.env.WORKOUT_API_URL;

class WorkoutMetrics {
  constructor(
    public workoutCount: number,
  ) {}
} 

function WelcomeBanner({ workoutCount }: { workoutCount: number }) {
  return (
    <div className="text-gray-900 dark:text-gray-100 flex-1">
      <h1 className="text-2xl lg:text-4xl">Welcome!</h1>
      <p>You&apos;ve done {workoutCount} workouts so far.</p>
    </div>
  )
}

async function getMetricsData(): Promise<WorkoutMetrics> {
  const token = await getAccessToken();

  // Request /workouts and pass the access token.
  const response = await fetch(`${apiUrl}/workouts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const workouts = await response.json();
  const metrics = new WorkoutMetrics(workouts.length);
  
  return metrics;
}

export default async function DashboardPage() {
  const metrics = await getMetricsData();
  let workoutTypes: WorkoutType[] | null = null;
  try {
    workoutTypes = await getWorkoutTypes();
  } catch (error) {
    console.error(error);
  }

  return (
    <main className="flex min-h-screen flex-col items-start p-10 lg:p-16">
      <div className="mb-4 lg:mb-12">
        <WelcomeBanner workoutCount={metrics.workoutCount}/>
      </div>
      <div className="w-full max-w-5xl items-center justify-around lg:flex">
        <NewWorkoutPanel workoutTypes={workoutTypes} error='Failed to fetch workout type data' />
      </div>
    </main>
  )
}