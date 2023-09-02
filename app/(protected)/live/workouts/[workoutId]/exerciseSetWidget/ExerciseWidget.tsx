'use client'

import { useState, useEffect, useRef } from "react";
import { Exercise, ExerciseType } from "@/lib/resources/apiTypes";
import { createExercise, overwriteExercise } from "@/lib/resources/exercises";
import SaveStatusIndicator, { SaveStatus } from "@/components/indicators/SaveStatusIndicator";
import { ReactElement } from "react";
import ExerciseInputModal, { ExerciseInputModalState } from "./ExerciseInputModal";


export async function saveNewExercise({ exercise, setExerciseSaveState, setExerciseId }: { exercise: Exercise, setExerciseSaveState: (saveState: SaveStatus) => void, setExerciseId: (id?: string) => void }) {
  if (exercise.id) {
    alert("Exercises that have an ID shouldn't be saved")
    return
  }
  setExerciseSaveState("saving");
  createExercise(exercise).then((ex) => {
    setExerciseSaveState("saved")
    setExerciseId(ex.id)
  });
}

export async function updateExistingExercise({ exercise, setExerciseSaveState }: { exercise: Exercise, setExerciseSaveState: (saveState: SaveStatus) => void }) {
  if (!exercise.id) {
    alert('exercises must have IDs to be updated')
    return
  }
  setExerciseSaveState("saving");
  overwriteExercise({id: exercise.id, exercise}).then(() => {
    setExerciseSaveState("saved")
  });
}

interface ExerciseWidgetProps {
  exercise: Exercise;
  exerciseType: ExerciseType;
  setSelfDeleted: (id: string | undefined) => void;
}

export default function ExerciseWidget({ exercise, exerciseType, setSelfDeleted }: ExerciseWidgetProps) {
  const [saveState, setSaveState] = useState<SaveStatus>(exercise.id ? "saved" : "unsaved");
  const [ex, setEx] = useState<Exercise>(exercise);
  // We have to keep track of the id separately from the exercise because otherwise when we first save the exercise,
  // we'll enter an infinite loop when we try to set the Id field and thus re-trigger the useEffect.
  const [id, setId] = useState<string | undefined>(exercise.id);
  const justLoadedFromServer = useRef<boolean>(!!ex.id);
  const [modal, setModal] = useState<ReactElement | null>(null);

  const showModal = () => {
    const onSubmit = (modalState: ExerciseInputModalState) => {
      setEx({...ex, ...modalState});
      setModal(null);
    }
    setModal(<ExerciseInputModal
      initalValues={{weight: ex.weight, reps: ex.reps}}
      inputType="update"
      onSubmit={onSubmit}
      onTrashClick={() => setSelfDeleted(ex.id)}
      exerciseTypeName={exerciseType.name}
      handleClose={ () => setModal(null) }
    />)
  }

  useEffect(() => {
    // This keeps us from saving data we already received from the server.
    if (justLoadedFromServer.current) {
      justLoadedFromServer.current = false;
    } else {
      if (id != null) {
        updateExistingExercise({ exercise: ex, setExerciseSaveState: setSaveState })
      } else {
        saveNewExercise({ exercise: ex, setExerciseSaveState: setSaveState, setExerciseId: setId })
      }
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
        <EditButtonContainer saveState={saveState} onClick={showModal} />
      </div>
      { modal }
    </div>
  )
}

type EditButtonContainerProps = {
  saveState: SaveStatus;
  onClick: () => void;
}

function EditButtonContainer({saveState, onClick}: EditButtonContainerProps) {
  const disabled = !(saveState === "saved");
  const color = disabled ? "text-gray-400" : "text-fuchsia-900";
  return (
    <div className={`mt-1 ${ color }`}>
      <button disabled={disabled} onClick={ onClick }><i className="text-lg fa-solid fa-pen-to-square" /></button>
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

  const fadeOutClasses = "transition-opacity ease-out duration-00 opacity-0";
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