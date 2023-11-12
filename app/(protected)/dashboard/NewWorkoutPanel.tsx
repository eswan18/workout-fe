"use client";

import { Workout, WorkoutType } from "@/lib/resources/apiTypes";

import { createWorkout } from "@/lib/resources/workouts";
import { useRouter } from "next/navigation";
import {
  Dumbbell,
  LineChart,
  LucideActivity,
  LucideBarChartHorizontalBig,
  LucideDumbbell,
  MoreHorizontal,
  Weight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

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
  const newWorkoutCards = workoutTypes.slice(0, 5).map((workoutType, index) => {
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
    <div className="w-full pt-2 flex flex-col justify-start items-start">
      <h2 className="text-xl">New Workout</h2>
      <div className="flex flex-row flex-wrap mt-2 gap-2 lg:gap-4 justify-start items-center">
        {newWorkoutCards}
        <AllWorkoutTypesButtonWithDropdown workoutTypes={workoutTypes} />
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
      variant="secondary"
      className="w-auto h-16 flex flex-col justify-between items-center"
      onClick={onClick}
    >
      <Dumbbell strokeWidth={3} />
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
          variant="secondary"
          className="h-16 w-auto flex flex-col justify-between items-center"
        >
          <MoreHorizontal />
          <p>All workouts</p>
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
      router.push(`/live/workouts/${workout.id}`);
    });
  };
  return (
    <DropdownMenuItem onClick={onClick}>{workoutType.name}</DropdownMenuItem>
  );
}
