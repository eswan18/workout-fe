"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Exercise,
  ExerciseType,
  StandaloneExercise,
  WorkoutWithType,
} from "@/lib/resources/apiTypes";
import { ExerciseSet } from "@/lib/resources/derived/workoutWithDetails";
import { ExerciseOrLoading } from "./exerciseGroupCard";
import { updateWorkout } from "@/lib/resources/workouts";
import { useRouter } from "next/navigation";
import { formatDateYMDHM } from "@/lib/time";
import ExerciseGroupCard from "./exerciseGroupCard";
import { CheckSquare, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDurationHMS } from "@/lib/time";
import StartNewExerciseGroupButton from "./StartNewExerciseGroupButton";
import { createExerciseType } from "@/lib/resources/exerciseTypes";

type ExerciseGroup = {
  exerciseType: ExerciseType;
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

  const [exerciseTps, setExerciseTps] = useState<ExerciseType[]>(exerciseTypes);
  const addNewExerciseType = (exerciseType: ExerciseType) => {
    createExerciseType(exerciseType).then((result) => {
      if (!result.success) {
        return;
      }
      const exerciseType = result.data;
      setExerciseTps([...exerciseTps, exerciseType]);
    });
  };
  const [groups, setGroups] = useState<ExerciseGroup[]>(initialGroups);
  const addGroup = (exerciseType: ExerciseType, exercises: Exercise[]) => {
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
          </div>
          <div className="flex-shrink-0 flex flex-col justify-start items-start min-w-fit">
            <LiveWorkoutCard workout={workout} />
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {groups.map(({ exerciseType, exercises, key }, idx) => {
            const setExercises = (exercises: ExerciseOrLoading[]) => {
              setExercisesForGroup(key, exercises);
            };
            // New exercises can only be added to the last group (this allows us to always group things by start time).
            const supportsAddingExercise = idx == groups.length - 1;
            return (
              <ExerciseGroupCard
                key={key}
                exerciseType={exerciseType}
                exercises={exercises}
                setExercises={setExercises}
                workout={workout}
                editable={true}
                supportsAddingExercise={supportsAddingExercise}
              />
            );
          })}
          <StartNewExerciseGroupButton
            onStartNewExerciseGroup={onStartNewExerciseGroup}
            exerciseTypes={exerciseTps}
            addNewExerciseType={addNewExerciseType}
          />
        </div>
      </div>
      <div className="w-full flex flex-row justify-center text-xl font-bold">
        <Button onClick={onFinishWorkout} className="mb-4">
          <p className="text-lg mr-3">Finish Workout</p>
          <CheckSquare />
        </Button>
      </div>
    </main>
  );
}

function LiveWorkoutCard({ workout }: { workout: WorkoutWithType }) {
  const startTime = new Date(workout.start_time);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Set up an interval to update the elapsed time every second
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader className="pt-3 pb-2 animate-pulse-2s">
        <CardTitle className="text-lg text-center">
          <Timer size={24} className="pb-1 mr-1 inline" />
          Live
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row justify-center items-center gap-1 w-auto text-sm p-3 pt-0">
        <div className="flex flex-col px-2 py-1 items-center justify-start">
          <span className="text-muted-foreground">Time Elapsed</span>
          <span className={`text-lg`}>{formatDurationHMS(startTime, now)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
