'use client'

import LabeledSolidPlusButton from "@/components/buttons/LabeledSolidPlusButton"

export default function CreateNewExerciseWidget({ addNewExercise }: { addNewExercise: () => void}) {
  return (
    <div className="rounded-lg p-2 lg:p-4 shadow-lg m-1 lg:m-2 flex flex-col items-center w-24 bg-white">
      <LabeledSolidPlusButton type="button" label="Add New" onClick={addNewExercise}/>
    </div>
  )
}