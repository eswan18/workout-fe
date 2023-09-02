'use client'

import SolidPlusButton from "@/components/buttons/SolidPlusButton"

export default function CreateNewExerciseWidget({ onClick }: { onClick: () => void}) {
  return (
    <div className="flex flex-col items-center justify-center w-20">
      <SolidPlusButton type="button" onClick={onClick}/>
    </div>
  )
}