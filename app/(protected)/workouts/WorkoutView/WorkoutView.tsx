"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { CheckSquare, Edit } from "lucide-react";

import {
  Exercise,
  ExerciseType,
  WorkoutWithType,
} from "@/lib/resources/apiTypes";
import { ExerciseGroup } from "@/lib/resources/derived/workoutWithDetails";
import { createExerciseType } from "@/lib/resources/exerciseTypes";
import { updateWorkout } from "@/lib/resources/workouts";
import { formatDateYMDHM } from "@/lib/time";
import ExerciseGroupCard from "./ExerciseGroupCard";
import WorkoutStatsCard from "./WorkoutStatsCard";
import LiveWorkoutCard from "./LiveWorkoutCard";
import { Button } from "@/components/ui/button";
import StartNewExerciseGroupButton from "./StartNewExerciseGroupButton";

type KeyedExerciseGroup = ExerciseGroup & { key: number };

type WorkoutViewProps = {
  workout: WorkoutWithType;
  exerciseGroups: KeyedExerciseGroup[];
  exerciseTypes: ExerciseType[];
  live?: boolean;
};

export default function WorkoutView({
  workout,
  exerciseGroups,
  exerciseTypes,
  live = false,
}: WorkoutViewProps) {
  const router = useRouter();
  const { toast } = useToast();
  const startTime = formatDateYMDHM(new Date(workout.start_time));

  // Workout groupings aren't a construct in the database, so we need to add an artificial key to each set.
  const initialGroups: KeyedExerciseGroup[] = exerciseGroups.map((g) => ({
    exerciseType: g.exerciseType,
    exercises: g.exercises,
    key: Math.random(),
  }));

  const [exerciseTps, setExerciseTps] = useState<ExerciseType[]>(exerciseTypes);
  const createExerciseTypeAndUpdateState = (exerciseType: ExerciseType) => {
    createExerciseType(exerciseType).then((result) => {
      if (!result.success) {
        return;
      }
      const exerciseType = result.data;
      setExerciseTps([...exerciseTps, exerciseType]);
    });
  };
  const [groups, setGroups] = useState<KeyedExerciseGroup[]>(initialGroups);
  const addGroup = (exerciseType: ExerciseType, exercises: Exercise[]) => {
    setGroups([...groups, { exerciseType, exercises, key: Math.random() }]);
  };
  const setExercisesForGroup = (key: number, exercises: Exercise[]) => {
    const newGroups = groups.map((g) => {
      if (g.key === key) {
        return { ...g, exercises };
      }
      return g;
    });
    setGroups(newGroups);
  };

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
  const onStartNewExerciseGroup = ({
    exerciseTypeId,
  }: {
    exerciseTypeId: string;
  }) => {
    const exerciseType = exerciseTps.find((type) => type.id === exerciseTypeId);
    if (!exerciseType) {
      // This should never happen.
      throw new Error("exercise type not found");
    }
    addGroup(exerciseType, []);
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
            {!live && (
              <Link href={`/workouts/live/${workout.id}`} className="text-lg">
                <Button variant="link" size="sm">
                  <p className="mr-2">Edit Workout</p>
                  <Edit size={20} />
                </Button>
              </Link>
            )}
          </div>
          <div className="flex-shrink-0 flex flex-col justify-start items-start min-w-fit">
            {live ? (
              <LiveWorkoutCard workout={workout} />
            ) : (
              <WorkoutStatsCard
                workout={workout}
                exerciseGroups={exerciseGroups}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {groups.map(({ exerciseType, exercises, key }, idx) => {
            const setExercises = (exercises: Exercise[]) => {
              setExercisesForGroup(key, exercises);
            };
            // New exercises can only be added to the last group (this allows us to always group things by start time).
            const supportsAddingExercise = live && idx == groups.length - 1;
            return (
              <ExerciseGroupCard
                key={key}
                exerciseType={exerciseType}
                exercises={exercises}
                setExercises={setExercises}
                workout={workout}
                editable={live}
                supportsAddingExercise={supportsAddingExercise}
              />
            );
          })}
          {live && (
            <StartNewExerciseGroupButton
              onStartNewExerciseGroup={onStartNewExerciseGroup}
              exerciseTypes={exerciseTps}
              createExerciseType={createExerciseTypeAndUpdateState}
            />
          )}
        </div>
      </div>
      <div className="w-full flex flex-row justify-center text-xl font-bold">
        {live && (
          <Button variant="link" onClick={onFinishWorkout} className="mb-4">
            <p className="text-xl mr-3">Finish Workout</p>
            <CheckSquare />
          </Button>
        )}
      </div>
    </main>
  );
}
