import { WorkoutWithType } from "@/lib/resources/apiTypes";
import { ExerciseSet } from "@/lib/resources/derived/workoutWithDetails";
import ExerciseGroupWidget from "./ExerciseGroupWidget";
import { formatDateYMDHM, formatDurationHMS } from "@/lib/time";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Edit2, Edit3, FileEdit, LineChart } from "lucide-react";

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
      <div className="flex flex-col justify-start lg:my-10 my-4">
        <div className="flex flex-row justify-between items-start flex-wrap w-fullgap-4">
          <div className="w-0 flex-grow flex-shrink-0 flex flex-col justify-start items-start text-3xl min-w-fit gap-3">
            <span className="text-base text-muted-foreground">
              {startTime}
            </span>
            <div className="flex flex-row items-center gap-4">
              <h1 className="text-4xl font-bold">
                {workoutName}
              </h1>
              <Link href={`/live/workouts/${workout.id}`} title="Edit workout" >
                <Button variant='secondary' size='sm'>
                  <Edit size={18} strokeWidth={3}/>
                </Button>
              </Link>
            </div>
          </div>
          <div className="w-0 flex-grow flex-shrink-0 flex flex-col justify-start items-end min-w-fit">
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
    <Card>
      <CardHeader className="pt-3 pb-0">
        <CardTitle className="text-lg text-center">Workout Stats</CardTitle>
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
