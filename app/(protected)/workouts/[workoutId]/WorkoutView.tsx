import { WorkoutWithType } from "@/lib/resources/apiTypes";
import { ExerciseSet } from "@/lib/resources/derived/workoutWithDetails";
import ExerciseGroupWidget from "./ExerciseGroupWidget";
import { formatDateYMDHM, formatDurationHMS } from "@/lib/time";
import Link from "next/link";

type WorkoutViewProps = {
  workout: WorkoutWithType;
  exerciseGroups: ExerciseSet[];
};

export default function WorkoutView({
  workout,
  exerciseGroups,
}: WorkoutViewProps) {
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
          <div className="w-0 flex-grow flex-shrink hidden sm:block">{/* Spacer */}</div>
          <div className="w-0 flex-grow flex-shrink-0 flex flex-col justify-start items-center text-3xl min-w-fit">
            <h1>{workoutName}</h1>
            <Link
              href={`/live/workouts/${workout.id}`}
              className="text-base lg:text-lg"
              title="Edit workout"
            >
              <button
                className="flex flex-row justify-center items-center
                          rounded-full border-gold text-gold
                          py-2 px-3"
              >
                <p>Edit</p>
                <i className="fi fi-rr-edit ml-1.5 inline-flex align-[-0.2rem]" />
              </button>
            </Link>
          </div>
          <div className="w-0 flex-grow flex-shrink-0 flex flex-col justify-start items-center min-w-fit">
            <WorkoutOverviewCard
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

function WorkoutOverviewCard({ workout, exerciseGroups }: WorkoutViewProps) {
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
    <div className="rounded-lg p-2 lg:p-3 shadow-md dark:shadow-sm flex flex-col gap-2 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 text-xs items-center w-auto">
      <h2 className="text-xl">Overview</h2>
      <div className="flex flex-row justify-between gap-8 w-auto">
        <div className="flex flex-col justify-end items-start">
          <span className="text-base">Duration</span>
          <span className="text-lg">{durationString}</span>
        </div>
        <div className="flex flex-col justify-start items-end">
          <div>
            {nExercises} exercise{nExercises != 1 && "s"}
          </div>
          <div>
            {nSets} set{nSets != 1 && "s"}
          </div>
          <div>
            {nReps} rep{nReps != 1 && "s"}
          </div>
        </div>
      </div>
    </div>
  );
}
