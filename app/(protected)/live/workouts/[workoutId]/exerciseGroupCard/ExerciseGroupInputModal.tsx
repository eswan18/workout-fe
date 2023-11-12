"use client";

import { useState } from "react";
import ClientModal from "@/components/ClientModal";
import Form from "@/components/forms/Form";
import { ExerciseType } from "@/lib/resources/apiTypes";

type ExerciseGroupInputModalProps = {
  onSubmit: (e: ExerciseGroupInputModalState) => void;
  exerciseTypes: ExerciseType[];
  handleClose?: () => void;
};

export type ExerciseGroupInputModalState = {
  exerciseTypeId: string;
};

export default function ExerciseGroupInputModal({
  onSubmit,
  handleClose,
  exerciseTypes,
}: ExerciseGroupInputModalProps) {
  const [exerciseTypeId, setExerciseTypeId] = useState<string | undefined>(
    undefined,
  );

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // If either weight or reps is undefined, prevent the form from submitting and show an error.
    if (exerciseTypeId === undefined) {
      alert("exercise type must be selected");
      return;
    }
    onSubmit({ exerciseTypeId });
  };

  return (
    <ClientModal handleClose={handleClose}>
      <Form onSubmit={onFormSubmit}>
        <div className="flex flex-row justify-between items-center mt-4 mb-6">
          <h2 className="text-2xl font-bold">Start a new exercise</h2>
        </div>
        <label
          htmlFor="exercise-type"
          className="mb-3 text-gray-700 dark:text-gray-100 flex flex-col"
        >
          <p className="mb-1">Exercise Type</p>
          <select
            className="dark:text-gray-900 rounded-md border border-gray-300"
            value={exerciseTypeId}
            onChange={(e) => setExerciseTypeId(e.target.value)}
          >
            {exerciseTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </label>
        <div className="flex flex-row justify-evenly items-center mt-4 text-lg">
          <button
            className="flex flex-row justify-center items-center
                      text-gold py-2 px-4 m-2 gap-2 font-bold"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="flex flex-row justify-center items-center
                      rounded-full text-white bg-gold
                      py-2 px-4 m-2 gap-2 font-bold text-xl"
            type="submit"
          >
            Start
          </button>
        </div>
      </Form>
    </ClientModal>
  );
}