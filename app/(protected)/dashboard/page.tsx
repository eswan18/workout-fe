import { getAllWorkoutTypes } from "@/lib/resources/workoutTypes/getWorkoutTypes";
import { getAllWorkoutsWithDetails } from "@/lib/resources/derived/workoutWithDetails";
import NewWorkoutPanel from "./NewWorkoutPanel";
import RecentWorkoutsPanel from "./RecentWorkoutsPanel";
import { nMostCommon } from "@/lib/mostCommon";

const N_EXERCISES = 4;

export default async function DashboardPage() {
  const workoutsResult = await getAllWorkoutsWithDetails({
    limit: N_EXERCISES,
  });
  if (!workoutsResult.success) throw workoutsResult.error;
  const allWorkouts = workoutsResult.data;
  // Get the most popular workouts for this user based on how many times they've been used.
  const wktIds = allWorkouts
    .map((wkt) => wkt.workout.workout_type_id)
    .filter((item): item is string => item != null && item != undefined);
  const favoriteWktTypeIds = nMostCommon(5, wktIds);

  const workoutTypesResult = await getAllWorkoutTypes();
  if (!workoutTypesResult.success) throw workoutTypesResult.error;
  const workoutTypes = workoutTypesResult.data;
  // Put the favorite workouts first in the list if they're present.
  const orderedWorkoutTypes = workoutTypes.sort((a, b) => {
    // This crazy solution brought to you by ChatGPT.
    const indexOfAInFavs = favoriteWktTypeIds.indexOf(a.id as string);
    const indexOfBInFavs = favoriteWktTypeIds.indexOf(b.id as string);
    return (
      (indexOfAInFavs === -1 ? Infinity : indexOfAInFavs) -
      (indexOfBInFavs === -1 ? Infinity : indexOfBInFavs)
    );
  });

  return (
    <main className="flex flex-col justify-start gap-10 p-10 lg:p-16">
      <div className="mb-4">
        <h1 className="text-2xl lg:text-4xl">Welcome!</h1>
      </div>
      {allWorkouts.length > 0 ? (
        <div className="w-full items-center justify-around lg:flex">
          <RecentWorkoutsPanel wktsWithDetails={allWorkouts} />
        </div>
      ) : null}
      <div className="w-full items-center justify-around lg:flex">
        <NewWorkoutPanel workoutTypes={orderedWorkoutTypes} />
      </div>
    </main>
  );
}
