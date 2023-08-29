'use client'

import { useState, useEffect } from "react";
import { Exercise, ExerciseType } from "@/lib/resources/apiTypes";
import CreateNewExerciseWidget from "./CreateNewExerciseWidget";
import { getAllExerciseTypes } from "@/lib/resources/exerciseTypes/getExerciseTypes";
import LoadingSpinner from "@/components/LoadingSpinner";

export async function saveExercise({exercise, setSaveState}: {exercise: Exercise, setSaveState: (saveState: SaveState) => void}) {
  setSaveState("saving");
  // Todo: actually save the exercise.
  // For now, just sleep 1 second.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  setSaveState("saved");
}

type SaveState = "saved" | "saving" | "unsaved"


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

type ExerciseSetWidgetProps = {
  exerciseType?: ExerciseType;
  exercises: Exercise[];
  workoutId: string;
}

export default function ExerciseSetWidget({ exerciseType, exercises, workoutId }: ExerciseSetWidgetProps) {
  const exesWithKeys: ExerciseWithKey[] = exercises.map((ex, idx) => ({exercise: ex, key: idx}));
  const [type, setType] = useState<ExerciseType | undefined>(exerciseType);
  const [exercisesWithKeys, setExercisesWithKeys] = useState<ExerciseWithKey[]>(exesWithKeys);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [exTypeOptions, setExTypeOptions] = useState<ExerciseType[]>([]);

  useEffect(() => {
    getAllExerciseTypes().then((types) => {
      setExTypeOptions(types);
      setIsLoading(false);
    })
  }, [])
  
  const appendNewExercise = () => {
    if (!type || !type.id ) {
      alert("choose an exercise type first!")
      return;
    }
    // This feels janky, but we need a unique key for each set that is constant across renders.
    const newKey = Math.random();
    // Show a modal to let the user pick weight and reps.
    const newExercise = { weight: 0, reps: 0, exercise_type_id: type.id, workout_id: workoutId };
    setExercisesWithKeys([...exercisesWithKeys, {exercise: newExercise, key: newKey}])
    

  }

  return (
    <div className="w-full rounded-lg p-2 lg:p-4 h-32 shadow-lg bg-fuchsia-50 m-1 lg:m-2">
      { isLoading ? <LoadingSpinner /> :
        <>
        { type ?
          <h2>type.name</h2> :
          <p>"Choose an exercise type" {exTypeOptions.map((type) => <p>{ type.name }</p>)}</p>
        }
        { type && (
          <div className="flex flex-row justify-between">
            { exercisesWithKeys.map((ex) => <ExerciseWidget exercise={ex.exercise} key={ex.key} />) }
            <CreateNewExerciseWidget addNewExercise={ appendNewExercise } />
          </div>
        )}
        </>
      }
    </div>
  )
}