import { WorkoutWithType } from "@/lib/resources/apiTypes";
import { ExerciseSet } from "@/lib/resources/derived/workoutWithDetails";
import ExerciseGroupWidget from './ExerciseGroupWidget'
import Link from "next/link";

type WorkoutViewProps = {
  workout: WorkoutWithType;
  exerciseGroups: ExerciseSet[];
}

export default function WorkoutView({ workout, exerciseGroups }: WorkoutViewProps) {
  const groups = exerciseGroups.map(
    (set) => ({exerciseType: set.exerciseType, exercises: set.exercises, key: set.exercises[0].id})
  );
  const workoutName = workout.workout_type_name || "Custom Workout";
  return (
    <main>
      <div className="flex flex-row justify-center items-start m-2 lg:my-10 text-3xl my-4 gap-4 lg:gap-6">
        <h1>{ workoutName }</h1>
        <Link href={`/live/workouts/${workout.id}`}><i className="fa-solid fa-pen-to-square text-fuchsia-900" title="Edit workout" /></Link>
      </div>
      {
        groups.map(({exerciseType, exercises}) => <ExerciseGroupWidget exerciseType={exerciseType} exercises={exercises} key={exercises[0].id} />)
      }
    </main>
  )
}