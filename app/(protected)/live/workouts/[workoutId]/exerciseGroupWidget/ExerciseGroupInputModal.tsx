'use client'

import { useState } from "react";
import ClientModal from "@/components/ClientModal";
import SolidButton from "@/components/buttons/SolidButton";
import GhostButton from "@/components/buttons/GhostButton";
import Form from "@/components/forms/Form";
import { ExerciseType } from "@/lib/resources/apiTypes";

type ExerciseInputModalProps = {
  onSubmit: (e: ExerciseGroupInputModalState) => void;
  exerciseTypes: ExerciseType[];
  handleClose?: () => void
}

export type ExerciseGroupInputModalState = {
  exerciseTypeId: string;
}

export default function ExerciseGroupInputModal({onSubmit, handleClose, exerciseTypes }: ExerciseInputModalProps) {
  const [exerciseTypeId, setExerciseTypeId] = useState<string | undefined>(undefined);
  const submitButtonEnabled = exerciseTypeId !== undefined;

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // If either weight or reps is undefined, prevent the form from submitting and show an error.
    if (exerciseTypeId === undefined) {
      alert("exercise type must be selected")
      return;
    }
    onSubmit({exerciseTypeId})
  }

  return (
    <ClientModal handleClose={ handleClose }>
      <Form onSubmit={onFormSubmit}>
        <div className="flex flex-row justify-between items-center mt-4 mb-6" >
          <h2 className="text-2xl font-bold">Start a new exercise</h2>
        </div>
        <label htmlFor="weight" className="mb-3 text-gray-700 dark:text-gray-100 flex flex-col">
          <p className="mb-1">Exercise Type</p>
          <select value={exerciseTypeId} onChange={(e) => setExerciseTypeId(e.target.value)}>
            {exerciseTypes.map((type) => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
        </label>
        <div className="flex flex-row justify-evenly items-center mt-4" >
          <span className="text-base">
            <GhostButton type="button" onClick={handleClose}>Cancel</GhostButton>
          </span>
          <span className="text-xl">
            <SolidButton type="submit" enabled={submitButtonEnabled}>Go</SolidButton>
          </span>
        </div>
      </Form>
    </ClientModal>
  )
}