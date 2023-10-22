import { WorkoutWithType } from "@/lib/resources/apiTypes";
import { ExerciseSet } from "@/lib/resources/derived/workoutWithDetails";
import ExerciseGroupWidget from "./ExerciseGroupWidget";
import { formatDateYMDHM, formatDurationHMS } from "@/lib/time";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart } from "lucide-react";

type WorkoutViewProps = {
  workout: WorkoutWithType;
  exerciseGroups: ExerciseSet[];
};

export default function WorkoutView({
  workout,
  exerciseGroups,
}: WorkoutViewProps) {
  const startTime = formatDateYMDHM(new Date(workout.start_time));
  const groups = exerciseGroups.map((set) => ({
    exerciseType: set.exerciseType,
    exercises: set.exercises,
    key: set.exercises[0].id,
  }));
  const workoutName = workout.workout_type_name || "Custom Workout";
  return (
    <main>
      <div className="flex flex-col justify-start items-center lg:my-10 my-4">
        <div className="flex flex-row justify-between items-start flex-wrap w-full px-4 gap-4">
          <div className="w-0 flex-grow flex-shrink hidden sm:block">
            {/* Spacer */}
          </div>
          <div className="w-0 flex-grow flex-shrink-0 flex flex-col justify-start items-center text-3xl min-w-fit gap-1">
            <span className="text-base text-gray-500 dark:text-gray-400">
              {startTime}
            </span>
            <h1>{workoutName}</h1>
            <Link
              href={`/live/workouts/${workout.id}`}
              className="text-base lg:text-lg"
              title="Edit workout"
            >
              <button
                className="flex flex-row justify-center items-center
                          rounded-full border-gold text-gold mt-2"
              >
                <p>Edit</p>
                <i className="fi fi-rr-edit ml-1.5 inline-flex align-[-0.2rem]" />
              </button>
            </Link>
          </div>
          <div className="w-0 flex-grow flex-shrink-0 flex flex-col justify-start items-center min-w-fit">
            <WorkoutStatsCard
              workout={workout}
              exerciseGroups={exerciseGroups}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {groups.map(({ exerciseType, exercises }) => (
          <ExerciseGroupWidget
            exerciseType={exerciseType}
            exercises={exercises}
            key={exercises[0].id}
          />
        ))}
      </div>
    </main>
  );
}

function WorkoutStatsCard({ workout, exerciseGroups }: WorkoutViewProps) {
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
    <Card className="bg-background">
      <CardHeader>
        <CardTitle className="text-lg text-center">Stats <LineChart className="ml-4 inline-block"/></CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-between w-auto text-sm">
        <div className="flex flex-row justify-center items-center gap-1">
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
        </div>
        <div className="flex flex-col px-2 py-1 items-center justify-start">
          <span className="text-gray-500 dark:text-gray-400">Duration</span>
          <span className="text-lg">{durationString}</span>
        </div>
      </CardContent>
    </Card>
  );
}
