import { getAllWorkoutTypes } from "@/lib/resources/workoutTypes/getWorkoutTypes";
import { getAllWorkouts } from "@/lib/resources/workouts/getWorkouts";
import NewWorkoutPanel from "./NewWorkoutPanel";

function WelcomeBanner({ workoutCount }: { workoutCount: number }) {
  return (
    <div className="text-gray-900 dark:text-gray-100 flex-1">
      <h1 className="text-2xl lg:text-4xl">Welcome!</h1>
      <p>You&apos;ve done {workoutCount} workouts so far.</p>
    </div>
  )
}

export default async function DashboardPage() {
  const workouts = await getAllWorkouts();
  const workoutTypes = await getAllWorkoutTypes();

  return (
    <main className="flex min-h-screen flex-col items-start p-10 lg:p-16">
      <div className="mb-4 lg:mb-12">
        <WelcomeBanner workoutCount={workouts.length}/>
      </div>
      <div className="w-full max-w-5xl items-center justify-around lg:flex">
        <NewWorkoutPanel workoutTypes={workoutTypes} error='Failed to fetch workout type data' />
      </div>
    </main>
  )
}