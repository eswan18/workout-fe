'use client'

import SolidPlusButton from "@/components/buttons/SolidPlusButton"

export default function CreateNewExerciseWidget({ addNewExercise }: { addNewExercise: () => void}) {
  return (
    <div className="rounded-lg p-2 lg:p-4 shadow-lg m-1 lg:m-2 flex flex-col items-center justify-center w-24">
      <SolidPlusButton type="button" onClick={addNewExercise}/>
    </div>
  )
}