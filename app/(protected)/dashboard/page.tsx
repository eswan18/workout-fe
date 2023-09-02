import { getAllWorkoutTypes } from "@/lib/resources/workoutTypes/getWorkoutTypes";
import { getAllWorkouts } from "@/lib/resources/workouts/getWorkouts";
import NewWorkoutPanel from "./NewWorkoutPanel";
import RecentWorkoutsPanel from "./RecentWorkoutsPanel";


export default async function DashboardPage() {
  const workouts = await getAllWorkouts();
  const workoutTypes = await getAllWorkoutTypes();

  return (
    <main className="flex min-h-screen flex-col justify-start gap-10 p-10 lg:p-16">
      <div className="mb-4 text-gray-900 dark:text-gray-100">
        <h1 className="text-2xl lg:text-4xl">Welcome!</h1>
      </div>
      <div className="w-full items-center justify-around lg:flex">
        <RecentWorkoutsPanel workouts={workouts} />
      </div>
      <div className="w-full items-center justify-around lg:flex">
        <NewWorkoutPanel workoutTypes={workoutTypes} error='Failed to fetch workout type data' />
      </div>
    </main>
  )
}