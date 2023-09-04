import { WorkoutWithType } from "@/lib/resources/apiTypes";
import { ExerciseSet } from "@/lib/resources/derived/workoutWithDetails";
import ExerciseGroupWidget from "./ExerciseGroupWidget";
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
      <div className="flex flex-col justify-start items-center lg:my-10 text-3xl my-4">
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
