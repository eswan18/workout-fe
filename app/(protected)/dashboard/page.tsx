import { getAllWorkoutTypes } from "@/lib/resources/workoutTypes/getWorkoutTypes";
import { getAllWorkoutsWithDetails } from "@/lib/resources/derived/workoutWithDetails";
import NewWorkoutPanel from "./NewWorkoutPanel";
import RecentWorkoutsPanel from "./RecentWorkoutsPanel";

const N_EXERCISES = 4;

export default async function DashboardPage() {
  const workoutsResult = await getAllWorkoutsWithDetails({
    limit: N_EXERCISES,
  });
  if (!workoutsResult.success) throw workoutsResult.error;
  const allWorkouts = workoutsResult.data;

  const workoutTypesResult = await getAllWorkoutTypes();
  if (!workoutTypesResult.success) throw workoutTypesResult.error;
  const workoutTypes = workoutTypesResult.data;

  return (
    <main className="flex flex-col justify-start gap-10 p-10 lg:p-16">
      <div className="mb-4">
        <h1 className="text-2xl lg:text-4xl">Welcome!</h1>
      </div>
      {
        allWorkouts.length > 0
        ?
          <div className="w-full items-center justify-around lg:flex">
            <RecentWorkoutsPanel wktsWithDetails={allWorkouts} />
          </div>
        :
          null
      }
      <div className="w-full items-center justify-around lg:flex">
        <NewWorkoutPanel workoutTypes={workoutTypes} />
      </div>
    </main>
  );
}
