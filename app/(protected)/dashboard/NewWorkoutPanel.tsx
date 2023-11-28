"use client";

import { Workout, WorkoutType } from "@/lib/resources/apiTypes";

import { createWorkout } from "@/lib/resources/workouts";
import { useRouter } from "next/navigation";
import { Dumbbell, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const maxWorkoutTypesToDisplay = 5;

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
  const router = useRouter();
  // The parent component should pass workout types in order of display priority
  // (descending), so we can just pull the first few.
  const newWorkoutCards = workoutTypes
    .slice(0, maxWorkoutTypesToDisplay)
    .map((workoutType, index) => {
      const onClick = () => {
        if (!workoutType.id) throw new Error("Workout type id is null");
        createAndStartWorkout(workoutType.id).then((workout) =>
          router.push(`/workouts/live/${workout.id}`),
        );
      };
      return (
        <NewWorkoutButton
          name={workoutType.name}
          onClick={onClick}
          key={index}
        />
      );
    });
  return (
    <div className="w-full flex flex-col justify-start items-start gap-3">
      <h2 className="text-2xl">New Workout</h2>
      <div className="w-full pt-2 flex flex-col justify-start items-start gap-1">
        <div className="flex flex-row flex-wrap gap-2 lg:gap-4 justify-start items-center my-1">
          <h3>Recents:</h3>
          {newWorkoutCards}
        </div>
        <div className="flex flex-row flex-wrap gap-2 lg:gap-4 justify-start items-center my-1">
          <h3>Or choose from</h3>
          <AllWorkoutTypesButtonWithDropdown workoutTypes={workoutTypes} />
        </div>
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
    <Button
      variant="outline"
      className="flex flex-row justify-start items-center"
      onClick={onClick}
    >
      <p>{name}</p>
    </Button>
  );
}

function AllWorkoutTypesButtonWithDropdown({
  workoutTypes,
}: {
  workoutTypes: WorkoutType[];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex flex-row justify-start items-center"
        >
          <p>All Workout Types</p>
          <MoreHorizontal className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>All Workouts</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {workoutTypes.map((wktType) => (
          <WorkoutTypeMenuItem workoutType={wktType} key={wktType.id} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function WorkoutTypeMenuItem({ workoutType }: { workoutType: WorkoutType }) {
  const router = useRouter();
  const onClick = () => {
    createAndStartWorkout(workoutType.id).then((workout) => {
      router.push(`/workouts/live/${workout.id}`);
    });
  };
  return (
    <DropdownMenuItem onClick={onClick}>{workoutType.name}</DropdownMenuItem>
  );
}
