'use client'

import { useState, useEffect } from "react";
import { Exercise, ExerciseType } from "@/lib/resources/apiTypes";
import { ExerciseSet } from "@/lib/resources/derived/workoutWithDetails";

export async function saveExercise({exercise, setSaveState}: {exercise: Exercise, setSaveState: (saveState: SaveState) => void}) {
  setSaveState("saving");
  // Todo: actually save the exercise.
  // For now, just sleep 1 second.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  setSaveState("saved");
}

type ExerciseSaveStatusAndKey = {
  exerciseSet?: ExerciseSet;
  isSaved: boolean;
  key: number;
};

type SaveState = "saved" | "saving" | "unsaved"

type ExerciseSetWidgetProps = {
  exerciseType?: ExerciseType;
  exercises: Exercise[];
}

function ExerciseWidget({ exercise }: { exercise: Exercise }) {
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const [ex, setEx] = useState<Exercise>(exercise);

  // Do this after the component mounts.
  useEffect(() => {
    saveExercise({exercise: ex, setSaveState})
  }, [ex]);

  return (
    <div className="w-full rounded-lg p-2 lg:p-4 shadow-lg m-1 lg:m-2 flex flex-col items-center">
      Weight: { ex.weight }, Reps: { ex.reps }
      { /* a little save status indicator */ }
      <div className="text-xl font-bold">
        {saveState === "saved" ?
          <i className="fa-regular fa-circle-check" />
          : saveState === "unsaved" ?
            <i className="fa-regular fa-circle opacity-25" />
            :
            <i className="fa-solid fa-spinner animate-spin" />
        }
      </div>
    </div>
  )
}

type ExerciseWithKey = {
  exercise: Exercise;
  key: number;
}

export default function ExerciseSetWidget({ exerciseType, exercises }: ExerciseSetWidgetProps) {
  const exesWithKeys = exercises.map((ex, idx) => ({exercise: ex, key: idx}));
  const [type, setType] = useState<ExerciseType | undefined>(exerciseType);
  const [exercisesWithKeys, setExercisesWithKeys] = useState<ExerciseWithKey[]>(exesWithKeys);

  return (
    <div className="w-full rounded-lg p-2 lg:p-4 shadow-lg bg-fuchsia-50 m-1 lg:m-2">
      <div className="flex flex-row justify-between">
        { exercisesWithKeys.map((ex) => <ExerciseWidget exercise={ex.exercise} key={ex.key} />) }
      </div>
    </div>
  )
}