'use client'

import SolidButton from "@/components/buttons/SolidButton"

export default function CreateNewExerciseGroupWidget({ onClick }: { onClick: () => void}) {
  return (
    <div className="rounded-lg p-2 lg:p-4 mt-4 whitespace-nowrap flex justify-start">
      <SolidButton type="button" onClick={onClick}>Start new set</SolidButton>
    </div>
  )
}