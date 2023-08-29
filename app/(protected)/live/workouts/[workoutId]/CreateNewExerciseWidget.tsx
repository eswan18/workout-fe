'use client'

import LabeledSolidPlusButton from "@/components/buttons/LabeledSolidPlusButton"

export default function CreateNewExerciseWidget({ addNewExercise }: { addNewExercise: () => void}) {
  return (
    <div className="w-32 rounded-lg p-2 lg:p-4 m-auto">
      <LabeledSolidPlusButton type="button" label="Add New" onClick={addNewExercise}/>
    </div>
  )
}