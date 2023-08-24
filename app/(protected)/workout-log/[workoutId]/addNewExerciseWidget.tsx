'use client'

import { ExerciseType } from "@/lib/resources/apiTypes"
import { useState } from "react"
import Button from "@/components/button"

export default function AddNewExerciseWidget({ exerciseTypes }: {exerciseTypes: Array<ExerciseType>}) {
  const [newExerciseTypeId, setNewExerciseTypeId] = useState<string | null>(null)

  return (
    <div>
      <h2>Add a new exercise...</h2>
      <select onChange={(e) => setNewExerciseTypeId(e.target.value)}>
        {exerciseTypes.map((exTp) => <option key={ exTp.id } value={ exTp.id }>{ exTp.name }</option>)}
      </select>
      <Button type="button" onClick={() => console.log(newExerciseTypeId)}>Add</Button>
    </div>
  )
}