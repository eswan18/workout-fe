'use client'

import { useState, useEffect, useRef } from "react";
import { Exercise } from "@/lib/resources/apiTypes";
import { createExercise, overwriteExercise } from "@/lib/resources/exercises";


type SaveState = "saved" | "saving" | "unsaved"


export async function saveExercise({ exercise, setExerciseSaveState, setExerciseId }: { exercise: Exercise, setExerciseSaveState: (saveState: SaveState) => void, setExerciseId: (id?: string) => void }) {
  setExerciseSaveState("saving");
  // If the exercise has an ID, we update it. Otherwise, we create a new one.
  if (exercise.id) {
    overwriteExercise({id: exercise.id, exercise}).then(() => {
      setExerciseSaveState("saved")
    });
  } else {
    createExercise(exercise).then((ex) => {
      setExerciseSaveState("saved")
      setExerciseId(ex.id)
    });
  }
}

export default function ExerciseWidget({ exercise }: { exercise: Exercise }) {
  const [saveState, setSaveState] = useState<SaveState>(exercise.id ? "saved" : "unsaved");
  const [ex, setEx] = useState<Exercise>(exercise);
  const [id, setId] = useState<string | undefined>(exercise.id);

  useEffect(() => {
    saveExercise({ exercise: ex, setExerciseSaveState: setSaveState, setExerciseId: setId })
  }, [ex]);

  return (
    <div className="rounded-lg p-1 lg:px-4 shadow-lg m-1 lg:mx-2 flex flex-col items-center w-24 bg-white">
      <div className="flex flex-col items-center justify-start">
        <SaveStatusContainer saveState={saveState} />
        <div className="text-2xl font-bold mt-1">
          {ex.weight}
        </div>
        <div className="text-xl">
          <i className="fa-solid fa-xmark text-gray-400" /> {ex.reps}
        </div>
        { /* a little save status indicator */}
        <StatusAndInteractContainer saveState={saveState} />
      </div>
    </div>
  )
}

function StatusAndInteractContainer({saveState}: {saveState: SaveState}) {
  const disabled = !(saveState === "saved");
  // This is the bottom of the widget, that shows a save indicator *or* buttons to edit & delete.
  const color = disabled ? "text-gray-400" : "text-fuchsia-900";
  return (
    <div className={`mt-2 ${ color }`}>
      <button disabled={disabled}><i className="text-lg fa-solid fa-pen-to-square" /></button>
    </div>
  )
}

function SaveStatusContainer({saveState}: {saveState: SaveState}) {
  const [isSaveStateIndicatorOpaque, setIsSaveStateIndicatorOpaque] = useState(false);
  const prevState = useRef<SaveState | undefined>(undefined);

  useEffect(() => {
    // Temporarily make the save indicator opaque when the save state changes.
    if (prevState.current != null) {
      setIsSaveStateIndicatorOpaque(true);
      // If we've saved the data, let the indicator fade out after a second.
      if (saveState === "saved") {
        setTimeout(() => {
          setIsSaveStateIndicatorOpaque(false)
        }, 1000);
      }
    }
    // Record the previous state for comparison next time.
    prevState.current = saveState;
  }, [saveState]);

  const saveStateIndicatorOpacity = isSaveStateIndicatorOpaque ? "opacity-100" : "opacity-0";
  return (
    <div className="h-6">
      <div className='text-lg font-bold'>
        <div className={`transition-opacity ease-out duration-1000 ${saveStateIndicatorOpacity}`}>
          {saveState === "saved" ?
            <i className='fa-regular fa-circle-check' />
            : saveState === "unsaved" ?
              <i className="fa-regular fa-circle opacity-25" />
              :
              <i className="fa-solid fa-spinner animate-spin" />
          }
        </div>
      </div>
    </div>
  )
}