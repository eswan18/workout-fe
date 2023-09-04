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
          wktsWithDetails.map((wktWithDetails) => (
            <RecentWorkoutCard
              key={wktWithDetails.workout.id}
              workoutWithDtls={wktWithDetails}
            />
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

function differenceInHoursMinutesAndSecondsFormatted(
  start: Date,
  end: Date,
): string {
  const diff = Math.abs(start.getTime() - end.getTime());
  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor(diff / 1000 / 60) % 60;
  const seconds = Math.floor(diff / 1000) % 60;
  return `${hours}:${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;
}

async function RecentWorkoutCard({
  workoutWithDtls,
}: {
  workoutWithDtls: WorkoutWithDetails;
}) {
  const { workout, exercises } = workoutWithDtls;
  const startTime = workout.start_time
    ? new Date(workout.start_time)
    : undefined;
  const endTime = workout.end_time ? new Date(workout.end_time) : undefined;
  const durationString =
    startTime && endTime
      ? differenceInHoursMinutesAndSecondsFormatted(startTime, endTime)
      : "Unfinished";
  const exerciseCount = exercises.length;

  const startTimeText = startTime ? formatDate(startTime) : "----";
  const name = workout.workout_type_name ?? "Custom";
  return (
    <Link href={`/workouts/${workout.id}`}>
      <div className="rounded-lg p-2 lg:p-3 shadow-md dark:shadow-sm shadow-gold w-32 h-32 flex flex-col bg-white dark:bg-gray-900 dark:shadow-gold text-gray-600 dark:text-gray-400">
        <div className="flex-grow">
          <p className="text-sm">{startTimeText}</p>
          <h2 className="text-gray-800 dark:text-gray-300 text-base lg:text-lg font-bold">
            {name}
          </h2>
        </div>
        <div className="flex-grow-0">
          <p className="text-sm">{exerciseCount} sets</p>
          <p className="text-sm">{durationString}</p>
        </div>
      </div>
    </Link>
  );
}
