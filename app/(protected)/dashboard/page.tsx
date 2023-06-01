import TotalsWidget from "./totalsWidget";
import { getAccessToken, getCurrentUser } from "@/lib/session";


const apiUrl = process.env.WORKOUT_API_URL;


class WorkoutMetrics {
  constructor(
    public workoutCount: number,
  ) {}
} 


async function getMetricsData() {
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1>Dashboard</h1>
        <TotalsWidget title="Total Workouts" value={metrics.workoutCount} color="bg-red-300" />
      </div>
    </main>
  )
}