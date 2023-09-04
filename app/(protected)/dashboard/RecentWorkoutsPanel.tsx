import { WorkoutWithType, WorkoutWithDetails } from "@/lib/resources/apiTypes";
import Link from "next/link";

type RecentWorkoutsPanelProps = {
  wktsWithDetails: WorkoutWithDetails[];
};

export default async function RecentWorkoutsPanel({
  wktsWithDetails,
}: RecentWorkoutsPanelProps) {
  // This should create a few cards representing recent workouts.
  // Sort the workouts by date, and then take the first 3.
  wktsWithDetails.sort((a, b) => {
    const aDate = new Date(a.workout.start_time ?? "1970-01-01");
    const bDate = new Date(b.workout.start_time ?? "1970-01-01");
    return bDate.getTime() - aDate.getTime();
  });
  return (
    <div className="w-full">
      <h2 className="text-2xl">Recent Workouts</h2>
      <div className="flex flex-row gap-2 lg:gap-4 flex-wrap mt-2">
        {wktsWithDetails.length > 0 ? (
          wktsWithDetails.map(({ workout }) => (
            <RecentWorkoutCard key={workout.id} workout={workout} />
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-300 pt-2">None yet!</p>
        )}
      </div>
    </div>
  );
}

function formatDate(date: Date): string {
  // Extract date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");

  const today = new Date();
  if (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate()
  ) {
    return `Today (${hour}:${minute})`;
  } else if (
    date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate() - 1
  ) {
    return "Yesterday";
  }

  // Combine components into a single string
  return `${year}-${month}-${day}`;
}

async function RecentWorkoutCard({ workout }: { workout: WorkoutWithType }) {
  const startTime = workout.start_time
    ? new Date(workout.start_time)
    : undefined;
  const startTimeText = startTime ? formatDate(startTime) : "----";
  const name = workout.workout_type_name ?? "Custom Workout";
  return (
    <Link href={`/workouts/${workout.id}`}>
      <div className="rounded-lg p-2 lg:p-4 shadow-lg w-32 h-32 flex flex-col gap-2 bg-white dark:bg-gray-800 dark:shadow-2xl">
        <p className="text-sm">{startTimeText}</p>
        <h2 className="text-gray-600 dark:text-gray-300 text-base lg:text-lg font-bold">{name}</h2>
      </div>
    </Link>
  );
}