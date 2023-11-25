import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";
import { formatDurationHMS } from "@/lib/time";
import { WorkoutWithType } from "@/lib/resources/apiTypes";
import { ExerciseGroup } from "@/lib/resources/derived/workoutWithDetails";

type WorkoutStatsCardProps = {
  workout: WorkoutWithType;
  exerciseGroups: ExerciseGroup[];
};

export default async function WorkoutStatsCard({
  workout,
  exerciseGroups,
}: WorkoutStatsCardProps) {
  const startTime = new Date(workout.start_time);
  const endTime = workout.end_time && new Date(workout.end_time);
  const durationString = endTime
    ? formatDurationHMS(startTime, endTime)
    : "Unfinished";
  const nExercises = exerciseGroups.length;
  const nSets = exerciseGroups.reduce(
    (acc, { exercises }) => acc + exercises.length,
    0,
  );
  const nReps = exerciseGroups.reduce(
    (acc, { exercises }) =>
      acc + exercises.reduce((acc, { reps }) => acc + (reps ?? 0), 0),
    0,
  );
  return (
    <Card>
      <CardHeader className="pt-3 pb-2">
        <CardTitle className="text-lg text-center">
          Stats <LineChart className="ml-4 inline-block" />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row justify-center items-center gap-1 w-auto text-sm p-3 pt-1">
        <div className="flex flex-col px-2 py-1 items-center justify-start">
          <span className="text-muted-foreground">Exercises</span>
          <span className="text-lg">{nExercises}</span>
        </div>
        <div className="flex flex-col px-2 py-1 items-center justify-start">
          <span className="text-muted-foreground">Sets</span>
          <span className="text-lg">{nSets}</span>
        </div>
        <div className="flex flex-col px-2 py-1 items-center justify-start">
          <span className="text-muted-foreground">Reps</span>
          <span className="text-lg">{nReps}</span>
        </div>
        <div className="flex flex-col px-2 py-1 items-center justify-start">
          <span className="text-muted-foreground">Duration</span>
          <span className="text-lg">{durationString}</span>
        </div>
      </CardContent>
    </Card>
  );
}
