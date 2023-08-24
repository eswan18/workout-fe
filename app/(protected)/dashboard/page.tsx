import { getAccessToken } from "@/lib/session";
import { getWorkoutTypes } from "@/lib/resources/workoutTypes/getWorkoutTypes";
import { WorkoutType } from "@/lib/resources/apiTypes";
import LabeledSolidPlusButton from "@/components/buttons/LabeledSolidPlusButton";


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
      <p>You've done {workoutCount} workouts so far.</p>
    </div>
  )
}

function QuickNewWorkoutPanel({ workoutTypes }: { workoutTypes: WorkoutType[] }) {
  const newWorkoutButtons = workoutTypes.slice(0, 4).map((workoutType) => {
    return <LabeledSolidPlusButton type="button" label={workoutType.name} />
  })
  return (
    <div className="border border-fuchsia-900 rounded-lg p-2 lg:p-4 shadow-lg bg-fuchsia-50">
      <h2 className="text-gray-900 text-lg lg:text-2xl">New Workout by Type</h2>
      <div className="flex flex-row flex-wrap mt-2 justify-between after:flex-1">
        { newWorkoutButtons }
      </div>
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
  const workoutTypes = await getWorkoutTypes();

  return (
    <main className="flex min-h-screen flex-col items-start p-10 lg:p-16">
      <div className="mb-4 lg:mb-12">
        <WelcomeBanner workoutCount={metrics.workoutCount}/>
      </div>
      <div className="w-full max-w-5xl items-center justify-around lg:flex">
        <QuickNewWorkoutPanel workoutTypes={workoutTypes}/>
      </div>
    </main>
  )
}