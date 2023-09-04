import { getAllWorkoutTypes } from "@/lib/resources/workoutTypes/getWorkoutTypes";
import { getAllWorkoutsWithDetails } from "@/lib/resources/derived/workoutWithDetails";
import NewWorkoutPanel from "./NewWorkoutPanel";
import RecentWorkoutsPanel from "./RecentWorkoutsPanel";

const N_EXERCISES = 4;

export default async function DashboardPage() {
  const workoutTypes = await getAllWorkoutTypes();
  const allWorkouts = await getAllWorkoutsWithDetails({ limit: N_EXERCISES });

  return (
    <main className="flex flex-col justify-start gap-10 p-10 lg:p-16">
      <div className="mb-4">
        <h1 className="text-2xl lg:text-4xl">Welcome!</h1>
      </div>
      <div className="w-full items-center justify-around lg:flex">
        <RecentWorkoutsPanel wktsWithDetails={allWorkouts} />
      </div>
      <div className="w-full items-center justify-around lg:flex">
        <NewWorkoutPanel workoutTypes={workoutTypes} />
      </div>
    </main>
  );
}
