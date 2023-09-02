import { Workout } from "@/lib/resources/apiTypes";
import Link from "next/link";

type RecentWorkoutsPanelProps = {
  workouts: Workout[];
}

export default async function RecentWorkoutsPanel({workouts}: RecentWorkoutsPanelProps) {
  // This should create a few cards representing recent workouts.
  // Sort the workouts by date, and then take the first 3.
  workouts.sort((a, b) => {
    const aDate = new Date(a.start_time ?? "1970-01-01");
    const bDate = new Date(b.start_time ?? "1970-01-01");
    return bDate.getTime() - aDate.getTime();
  })
  const recentWorkouts = workouts.slice(0, 3);
  return (
    <div className="w-full">
      <h2 className="text-2xl">Recent Workouts</h2>
      <div className="flex flex-row gap-2 lg:gap-4">
        {
          recentWorkouts.map((workout) => <RecentWorkoutCard key={workout.id} workout={workout} />)
        }
      </div>
    </div>
  )
}

function formatDate(date: Date): string {
  // Extract date components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  const today = new Date();
  if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
    return `Today (${hour}:${minute})`;
  } else if (date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate() - 1) {
    return "Yesterday";
  }

  // Combine components into a single string
  return `${year}-${month}-${day}`;
}

async function RecentWorkoutCard({workout}: {workout: Workout}) {
  const startTime = workout.start_time ? new Date(workout.start_time) : undefined;
  const startTimeText = startTime ? formatDate(startTime) : "----";
  return (
    <Link href={`/workouts/${workout.id}`}>
      <div className="rounded-lg p-2 lg:p-4 shadow-lg w-32 h-32 flex flex-col">
        <p className="text-sm">{ startTimeText }</p>
        <h2 className="text-gray-900 text-base lg:text-lg">Workout</h2>
      </div>
    </Link>
  )
}