'use client'


import { Exercise } from "@/lib/resources/apiTypes";
import { createExercise, overwriteExercise } from "@/lib/resources/exercises";
import { SaveStatus } from "@/components/indicators/SaveStatusIndicator";
import SaveStatusOverlayContainer from "./SaveStatusOverlayContainer";


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
  weight: number;
  reps: number;
  saveStatus: SaveStatus;
  onEditButtonClick: () => void;
}

export default function ExerciseWidget({ weight, reps, saveStatus, onEditButtonClick}: ExerciseWidgetProps) {
  return (
    <div className="rounded-lg p-1 shadow-lg m-1 lg:mx-2 flex flex-col items-center w-20 bg-white shrink-0">
      <div className="flex flex-col items-center justify-start relative">
        <SaveStatusOverlayContainer saveStatus={saveStatus} />
        <div className="text-2xl font-bold mt-1">
          {weight}
        </div>
        <div className="text-xl">
          <i className="fa-solid fa-xmark text-gray-400" /> {reps}
        </div>
        <EditButtonContainer saveStatus={saveStatus} onClick={onEditButtonClick} />
      </div>
    </div>
  )
}

type EditButtonContainerProps = {
  saveStatus: SaveStatus;
  onClick: () => void;
}

function EditButtonContainer({saveStatus, onClick}: EditButtonContainerProps) {
  const disabled = !(saveStatus === "saved");
  const color = disabled ? "text-gray-400" : "text-fuchsia-900";
  return (
    <div className={`mt-1 ${ color }`}>
      <button disabled={disabled} onClick={onClick}><i className="text-lg fa-solid fa-pen-to-square" /></button>
    </div>
  )
}
