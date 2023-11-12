"use client";

import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Exercise,
  ExerciseType,
  WorkoutWithType,
} from "@/lib/resources/apiTypes";
import { ExerciseSet } from "@/lib/resources/derived/workoutWithDetails";
import { ExerciseOrLoading } from "./exerciseGroupCard";
import ExerciseGroupInputModal, {
  ExerciseGroupInputModalState,
} from "./exerciseGroupCard/ExerciseGroupInputModal";
import ExerciseInputModal, {
  ExerciseInputModalState,
} from "./exerciseGroupCard/ExerciseInputModal";
import { createExercise, overwriteExercise } from "@/lib/resources/exercises";
import { deleteExercise } from "@/lib/resources/exercises/delete";
import { updateWorkout } from "@/lib/resources/workouts";
import { useRouter } from "next/navigation";
import { formatDateYMDHM } from "@/lib/time";
import ExerciseGroupCard from "./exerciseGroupCard";
import { CheckSquare, Dumbbell, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDurationHMS } from "@/lib/time";

type ExerciseGroup = {
  exerciseType?: ExerciseType;
  exercises: ExerciseOrLoading[];
  key: number;
};

type LiveWorkoutProps = {
  workout: WorkoutWithType;
  exerciseSets: ExerciseSet[];
  exerciseTypes: ExerciseType[];
};

export default function LiveWorkout({
  workout,
  exerciseSets,
  exerciseTypes,
}: LiveWorkoutProps) {
  const router = useRouter();
  const { toast } = useToast();
  const startTime = formatDateYMDHM(new Date(workout.start_time));

  // Workout groupings aren't a construct in the database, so we need to add an artificial key to each set.
  const initialGroups: ExerciseGroup[] = exerciseSets.map((set) => ({
    exerciseType: set.exerciseType,
    exercises: set.exercises,
    key: Math.random(),
  }));
  const [modal, setModal] = useState<React.ReactElement | null>(null);

  const [groups, setGroups] = useState<ExerciseGroup[]>(initialGroups);
  const addGroup = (
    exerciseType: ExerciseType | undefined,
    exercises: Exercise[],
  ) => {
    setGroups([...groups, { exerciseType, exercises, key: Math.random() }]);
  };
  const setExercisesForGroup = (
    key: number,
    exercises: ExerciseOrLoading[],
  ) => {
    const newGroups = groups.map((g) => {
      if (g.key === key) {
        return { ...g, exercises };
      }
      return g;
    });
    setGroups(newGroups);
  };

  // This is triggered when the user clicks the "New exercise" button.
  const onClickCreateNewExerciseGroup = () => {
    const onSubmit = (e: ExerciseGroupInputModalState) => {
      setModal(null);
      if (!e.exerciseTypeId) {
        return;
      }
      // Get the exercise type for the given ID.
      const exerciseType = exerciseTypes.find(
        (type) => type.id === e.exerciseTypeId,
      );
      if (!exerciseType) {
        // This should never happen.
        throw new Error("exercise type not found");
      }
      addGroup(exerciseType, []);
    };
    setModal(
      <ExerciseGroupInputModal
        exerciseTypes={exerciseTypes}
        onSubmit={onSubmit}
        handleClose={() => setModal(null)}
      />,
    );
  };

  function openNewExerciseModal({
    exerciseType,
    exercises,
    setExercises,
  }: {
    exerciseType: ExerciseType;
    exercises: ExerciseOrLoading[];
    setExercises: (exercises: ExerciseOrLoading[]) => void;
  }) {
    // This feels janky, but we need a unique key for each exercise that is constant across renders.
    function onSubmit({ weight, reps }: ExerciseInputModalState) {
      const newExercise: Exercise = {
        workout_id: workout.id,
        exercise_type_id: exerciseType.id as string,
        weight,
        reps,
        start_time: new Date(),
      };
      createExercise(newExercise).then((result) => {
        if (!result.success) {
          throw result.error;
        }
        const ex = result.data;
        setExercises([...exercises, ex]);
      });
      setModal(null);
    }
    setModal(
      <ExerciseInputModal
        onSubmit={onSubmit}
        inputType="create"
        exerciseTypeName={exerciseType.name}
        handleClose={() => setModal(null)}
      />,
    );
  }

  function openEditExerciseModal(
    exerciseId: string,
    {
      exerciseType,
      exercises,
      setExercises,
    }: {
      exerciseType: ExerciseType;
      exercises: ExerciseOrLoading[];
      setExercises: (exercises: ExerciseOrLoading[]) => void;
    },
  ) {
    const thisExercise = exercises.find((ex) => ex.id === exerciseId) as
      | Exercise
      | undefined;
    if (thisExercise === undefined) {
      return;
    }
    const onSubmit = (modalState: ExerciseInputModalState) => {
      // On submit, we update the exercise both in page state and in the database.
      setExercises(
        exercises.map((ex) => {
          if (ex.id === exerciseId) {
            const newExercise = { ...ex, ...modalState };
            overwriteExercise({
              id: exerciseId,
              exercise: newExercise as Exercise,
            });
            return newExercise;
          } else {
            return ex;
          }
        }),
      );
      setModal(null);
    };
    const onDeleteButtonClick = () => {
      // On delete, we remove the exercise from page state and from the database.
      setExercises(exercises.filter((ex) => ex.id !== exerciseId));
      deleteExercise(exerciseId);
      setModal(null);
    };
    setModal(
      <ExerciseInputModal
        initalValues={{ weight: thisExercise.weight, reps: thisExercise.reps }}
        onDeleteButtonClick={onDeleteButtonClick}
        inputType="update"
        onSubmit={onSubmit}
        exerciseTypeName={exerciseType.name}
        handleClose={() => setModal(null)}
      />,
    );
  }

  const onFinishWorkout = () => {
    // Mark the workout finished.
    updateWorkout({
      workoutId: workout.id,
      fields: {
        end_time: new Date(),
        status: "completed",
      },
    }).then(() => {
      // For now, redirect to the view-only workout page. Eventually this should go to some kind of summary.
      router.push(`/workouts/${workout.id}`);
      toast({
        title: "Workout saved!",
      });
    });
  };

  const workoutName = workout.workout_type_name || "Custom Workout";
  return (
    <main>
      <div className="flex flex-col justify-start lg:my-10 my-4 px-4 gap-8">
        <div className="flex flex-row justify-between items-start flex-wrap gap-2">
          <div className="flex-grow flex-shrink-0 flex flex-col justify-start items-start text-3xl min-w-fit gap-1">
            <span className="text-base text-gray-500 dark:text-gray-400">
              {startTime}
            </span>
            <h1 className="text-4xl">{workoutName}</h1>
          </div>
          <div className="flex-shrink-0 flex flex-col justify-start items-start min-w-fit">
            <LiveWorkoutCard workout={workout} />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {groups.map(({ exerciseType, exercises, key }) => {
            const setExercises = (exercises: ExerciseOrLoading[]) =>
              setExercisesForGroup(key, exercises);
            function onClickCreateNewExercise(): void {
              openNewExerciseModal({
                exerciseType: exerciseType as ExerciseType,
                exercises,
                setExercises,
              });
            }
            function onClickEditExercise(exerciseId: string): void {
              openEditExerciseModal(exerciseId, {
                exerciseType: exerciseType as ExerciseType,
                exercises,
                setExercises,
              });
            }
            return (
              <ExerciseGroupCard
                exerciseType={exerciseType}
                exercises={exercises}
                key={exercises[0].id}
                onClickEditExercise={onClickEditExercise}
                onClickCreateNewExercise={onClickCreateNewExercise}
              />
            );
          })}
          <Button
            variant="secondary"
            className="w-fit"
            onClick={onClickCreateNewExerciseGroup}
          >
            <Dumbbell className="mr-2" />
            New exercise
          </Button>
        </div>
      </div>
      {modal}
      <div className="w-full flex flex-row justify-center text-xl font-bold">
        <Button onClick={onFinishWorkout}>
          <p className="text-lg mr-3">Finish Workout</p>
          <CheckSquare />
        </Button>
      </div>
    </main>
  );
}

function LiveWorkoutCard({ workout }: { workout: WorkoutWithType }) {
  const startTime = new Date(workout.start_time);
  const now = new Date();
  const elapsedTime = formatDurationHMS(startTime, now);

  return (
    <Card>
      <CardHeader className="pt-3 pb-2">
        <CardTitle className="text-lg text-center">
          <Timer size={24} className="pb-1 mr-1 inline" />
          Live
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row justify-center items-center gap-1 w-auto text-sm p-3 pt-0">
        <div className="flex flex-col px-2 py-1 items-center justify-start">
          <span className="text-muted-foreground">Time Elapsed</span>
          <span className="text-lg">{elapsedTime}</span>
        </div>
      </CardContent>
    </Card>
  );
}
