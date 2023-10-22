import { WorkoutWithDetails } from "@/lib/resources/apiTypes";
import Link from "next/link";
import { formatDateYMD, formatDurationHMS } from "@/lib/time";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CandlestickChart, LineChart } from "lucide-react";

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
    <div className="w-full flex flex-col justify-start items-start">
      <h2 className="text-2xl">Recent Workouts</h2>
      <div className="flex flex-row gap-4 flex-wrap mt-2 justify-center lg:justify-start">
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
    startTime && endTime ? formatDurationHMS(startTime, endTime) : "Unfinished";
  const exerciseCount = exercises.length;

  const startTimeText = startTime ? formatDateYMD(startTime, true) : "----";
  const name = workout.workout_type_name ?? "Custom Workout";
  return (
    <Link href={`/workouts/${workout.id}`}>
      <Card className="w-40 h-40 flex flex-col justify-between">
        <CardHeader className="p-4">
          <CardDescription>{startTimeText}</CardDescription>
          <CardTitle className="text-lg">{name}</CardTitle>
        </CardHeader>
        <CardFooter className="flex flex-row items-end justify-between">
          <div className="flex flex-col items-start gap-1">
            <p className="text-sm text-muted-foreground">{exerciseCount} sets</p>
            <p className="text-sm text-muted-foreground">{durationString}</p>
          </div>
          <LineChart />
        </CardFooter>
      </Card>
    </Link>
  );
}
