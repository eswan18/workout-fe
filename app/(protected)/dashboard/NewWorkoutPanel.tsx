"use client";

import { Workout, WorkoutType } from "@/lib/resources/apiTypes";

import { createWorkout } from "@/lib/resources/workouts";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MoreWorkoutTypesModal from "./MoreWorkoutTypesModal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Goal, MoreHorizontal, MoreHorizontalIcon, MoveRight, Weight } from "lucide-react";

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
  // The parent component should pass workout types in order of display priority
  // (descending), so we can just pull the first few.
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
      <div className="flex flex-row flex-wrap mt-2 gap-2 lg:gap-4 justify-center lg:justify-start items-center">
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
};

function NewWorkoutButton({
  name,
  onClick,
}: NewWorkoutButtonProps) {
    /*<Link href={`/workouts/${workout.id}`}>
      <Card className="w-40 h-40 flex flex-col justify-between">
        <CardHeader className="p-4">
          <CardDescription>{startTimeText}</CardDescription>
          <CardTitle className="text-lg">{name}</CardTitle>
        </CardHeader>
        <CardFooter className="flex flex-col items-start p-4 gap-1">
          <p className="text-sm text-muted-foreground">{exerciseCount} sets</p>
          <p className="text-sm text-muted-foreground">{durationString}</p>
        </CardFooter>
      </Card>
    </Link> */
  return (
    <Button variant='outline' className="w-32 h-16 flex flex-col justify-between items-center" onClick={onClick}>
        <Weight />{name} 
    </Button>
  );
}

function MoreWorkoutsButton({ onClick }: { onClick: () => void }) {
  return (
    <Button variant='outline' className="w-32 h-16 lg:w-auto flex flex-col justify-between items-center" onClick={onClick}>
      {/* Forcing the button to be exactly 32 in small screens helps because then it lines up better in two-row layouts. */}
      <MoreHorizontal />More Options 
    </Button>
  );
}
