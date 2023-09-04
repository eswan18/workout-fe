"use client";

import { Workout, WorkoutType } from "@/lib/resources/apiTypes";

import { createWorkout } from "@/lib/resources/workouts";
import { useRouter } from "next/navigation";

async function createAndStartWorkout(workoutTypeId: string): Promise<Workout> {
  const workout: Workout = {
    workout_type_id: workoutTypeId,
    status: "in-progress",
    start_time: new Date(), // start the workout right now.
  };
  return await createWorkout({ workout });
}

export default function NewWorkoutPanel({
  workoutTypes,
}: {
  workoutTypes: WorkoutType[];
}) {
  const router = useRouter();
  const newWorkoutCards = workoutTypes.slice(0, 4).map((workoutType, index) => {
    const onClick = () => {
      if (!workoutType.id) throw new Error("Workout type id is null");
      createAndStartWorkout(workoutType.id).then((workout) =>
        router.push(`/live/workouts/${workout.id}`),
      );
    };
    return (
      <NewWorkoutButton name={workoutType.name} onClick={onClick} key={index} />
    );
  });
  return (
    <div className="w-full pt-2">
      {workoutTypes && <h2 className="text-lg lg:text-2xl">New Workout</h2>}
      <div className="flex flex-row flex-wrap mt-2 gap-2 lg:gap-4">
        {newWorkoutCards}
      </div>
    </div>
  );
}

type NewWorkoutButtonProps = {
  name: string;
  onClick: () => void;
};

function NewWorkoutButton({ name, onClick }: NewWorkoutButtonProps) {
  return (
    <button className="flex flex-col" onClick={onClick}>
      <div className="w-32 h-16 rounded-lg shadow-md dark:shadow-sm shadow-gold dark:shadow-gold flex flex-row justify-between items-center px-2 text-gray-800 dark:text-gray-300 bg-white dark:bg-gray-900">
        <p className="px-2">{name}</p>
        <i className="fi fi-sr-arrow-alt-circle-right text-3xl inline-flex align-[-0.2rem] text-gold" />
      </div>
    </button>
  );
}
