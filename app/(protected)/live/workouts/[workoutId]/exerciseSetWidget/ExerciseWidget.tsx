'use client'

import { useState, useEffect, useRef } from "react";
import { Exercise } from "@/lib/resources/apiTypes";
import { createExercise, overwriteExercise } from "@/lib/resources/exercises";
import SaveStatusIndicator, { SaveStatus } from "@/components/indicators/SaveStatusIndicator";


export async function saveExercise({ exercise, setExerciseSaveState, setExerciseId }: { exercise: Exercise, setExerciseSaveState: (saveState: SaveStatus) => void, setExerciseId: (id?: string) => void }) {
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
  const [saveState, setSaveState] = useState<SaveStatus>(exercise.id ? "saved" : "unsaved");
  const [ex, setEx] = useState<Exercise>(exercise);
  const [id, setId] = useState<string | undefined>(exercise.id);
  const justLoadedFromServer = useRef<boolean>(!!ex.id);

  useEffect(() => {
    // This keeps us from saving data we already recieved from the server.
    if (justLoadedFromServer.current) {
      justLoadedFromServer.current = false;
    } else {
      saveExercise({ exercise: ex, setExerciseSaveState: setSaveState, setExerciseId: setId })
    }
  }, [ex]);

  return (
    <div className="rounded-lg p-1 shadow-lg m-1 lg:mx-2 flex flex-col items-center w-20 bg-white shrink-0">
      <div className="flex flex-col items-center justify-start relative">
        <SaveStatusOverlayContainer saveState={saveState} />
        <div className="text-2xl font-bold mt-1">
          {ex.weight}
        </div>
        <div className="text-xl">
          <i className="fa-solid fa-xmark text-gray-400" /> {ex.reps}
        </div>
        <EditButtonContainer saveState={saveState} />
      </div>
    </div>
  )
}

function EditButtonContainer({saveState}: {saveState: SaveStatus}) {
  const disabled = !(saveState === "saved");
  const color = disabled ? "text-gray-400" : "text-fuchsia-900";
  return (
    <div className={`mt-1 ${ color }`}>
      <button disabled={disabled}><i className="text-lg fa-solid fa-pen-to-square" /></button>
    </div>
  )
}

function SaveStatusOverlayContainer({saveState}: {saveState: SaveStatus}) {
  const [isSaveStateIndicatorOpaque, setIsSaveStateIndicatorOpaque] = useState(false);
  const prevState = useRef<SaveStatus | undefined>(saveState);
  const [isFullyHidden, setIsFullyHidden] = useState(true);

  useEffect(() => {
    // Temporarily make the save indicator opaque when the save state changes.
    if (prevState.current != saveState) {
      setIsFullyHidden(false);
      setIsSaveStateIndicatorOpaque(true);
      // If we've saved the data, let the indicator fade out after a second.
      if (saveState === "saved") {
        setTimeout(() => {
          setIsSaveStateIndicatorOpaque(false)
        }, 1000);
      }
      // As the idicator fades out, set the fully hidden state to true so that the
      // previously-covered objects can respond to clicks.
      setTimeout(() => {
        setIsFullyHidden(true);
      }, 1500);
    }
    // Record the previous state for comparison next time.
    prevState.current = saveState;
  }, [saveState]);

  const fadeOutClasses = "transition-opacity ease-out duration-500 opacity-0";
  const saveStateIndicatorOpacity = isSaveStateIndicatorOpaque ? "opacity-90" : fadeOutClasses;
  return (
    <div
      className={`absolute w-full h-full top-0 left-0
      bg-white text-4xl ${saveStateIndicatorOpacity} ${isFullyHidden ? "hidden" : null}`}
    >
      <div className="flex flex-row justify-center items-center h-full">
        <SaveStatusIndicator saveStatus={saveState} />
      </div>
    </div>
  )
}