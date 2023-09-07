"use client";

import { Workout, WorkoutType } from "@/lib/resources/apiTypes";

import { createWorkout } from "@/lib/resources/workouts";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MoreWorkoutTypesModal from "./MoreWorkoutTypesModal";

async function createAndStartWorkout(
  workoutTypeId: string | undefined,
): Promise<Workout> {
  const workout: Workout = {
    workout_type_id: workoutTypeId,
    status: "in-progress",
    start_time: new Date(), // start the workout right now.
  };

  const result = await createWorkout({ workout });
  if (!result.success) {
    throw result.error;
  }
  return result.data;
}

export default function NewWorkoutPanel({
  workoutTypes,
}: {
  workoutTypes: WorkoutType[];
}) {
  const [modal, setModal] = useState<React.ReactNode | null>(null);
  const router = useRouter();
  // a temporary thing to test what happens with more workouts
  const newWorkoutCards = workoutTypes.slice(0, 3).map((workoutType, index) => {
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
  const onMoreClick = () => {
    setModal(
      <MoreWorkoutTypesModal
        workoutTypes={workoutTypes}
        handleClose={() => setModal(null)}
        createAndStartWorkout={createAndStartWorkout}
      />,
    );
  };
  return (
    <div className="w-full pt-2">
      {workoutTypes && <h2 className="text-lg lg:text-2xl">New Workout</h2>}
      <div className="flex flex-row flex-wrap mt-2 gap-2 lg:gap-4">
        {newWorkoutCards}
        <MoreWorkoutsButton onClick={onMoreClick} />
      </div>
      {modal}
    </div>
  );
}

type NewWorkoutButtonProps = {
  name: string;
  onClick: () => void;
  showAsDots?: boolean;
};

function NewWorkoutButton({
  name,
  onClick,
  showAsDots = false,
}: NewWorkoutButtonProps) {
  return (
    <button className="flex flex-col" onClick={onClick}>
      <div className="w-32 h-16 rounded-lg shadow-md dark:shadow-sm shadow-gold dark:shadow-gold flex flex-row justify-between items-center px-4 text-gray-800 dark:text-gray-300 bg-white dark:bg-gray-900">
        <p className="pr-3 text-left">{name}</p>
        {showAsDots ? (
          <i className="fi fi-rs-circle-ellipsis text-3xl inline-flex align-[-0.2rem] text-gold" />
        ) : (
          <i className="fi fi-rr-arrow-alt-circle-right text-3xl inline-flex align-[-0.2rem] text-gold" />
        )}
      </div>
    </button>
  );
}

function MoreWorkoutsButton({ onClick }: { onClick: () => void }) {
  return (
    <button className="flex flex-col" onClick={onClick}>
      <div className="h-16 rounded-lg flex flex-row justify-between items-center px-4 text-gold">
        <p className="pr-3 font-bold">More Workouts...</p>
      </div>
    </button>
  );
}
