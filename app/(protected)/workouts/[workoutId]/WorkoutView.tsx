"use client";

import { WorkoutWithType } from "@/lib/resources/apiTypes";
import { ExerciseSet } from "@/lib/resources/derived/workoutWithDetails";
import { formatDateYMDHM, formatDurationHMS } from "@/lib/time";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, LineChart } from "lucide-react";
import ExerciseGroupCard from "../../live/workouts/[workoutId]/exerciseGroupCard";

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
      <div className="flex flex-col justify-start lg:my-10 my-4 px-4 gap-8">
        <div className="flex flex-row justify-between items-start flex-wrap gap-2">
          <div className="flex-grow flex-shrink-0 flex flex-col justify-start items-start text-3xl min-w-fit gap-1">
            <span className="text-base text-gray-500 dark:text-gray-400">
              {startTime}
            </span>
            <h1 className="text-4xl">
              {workoutName}
              <Link href={`/live/workouts/${workout.id}`} title="Edit workout">
                <Button
                  variant="secondary"
                  size="sm"
                  className="ml-2 -translate-y-1"
                >
                  <Edit size={18} />
                </Button>
              </Link>
            </h1>
          </div>
          <div className="flex-shrink-0 flex flex-col justify-start items-start min-w-fit">
            <WorkoutStatsCard
              workout={workout}
              exerciseGroups={exerciseGroups}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {groups.map(({ exerciseType, exercises }) => (
            <ExerciseGroupCard
              exerciseType={exerciseType}
              exercises={exercises}
              setExercises={() => {}}
              key={exercises[0].id}
              editable={false}
              supportsAddingExercise={false}
              workout={workout}
            />
          ))}
        </div>
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
