import TotalsWidget from "./totalsWidget";
import { getAccessToken, getCurrentUser } from "@/lib/session";


const apiUrl = process.env.WORKOUT_API_URL;


class WorkoutMetrics {
  constructor(
    public workoutCount: number,
  ) {}
} 

function WelcomeBanner() {
  return (
    <h1 className="text-2xl">Welcome!</h1>
  )
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
    <main className="flex min-h-screen flex-col items-start p-14">
      <div className="">
        <WelcomeBanner />
      </div>
      <div className="z-10 w-full max-w-5xl items-center lg:flex">
        <h2>Dashboard</h2>
        <TotalsWidget title="Total Workouts" value={metrics.workoutCount} color="bg-red-300" />
      </div>
    </main>
  )
}