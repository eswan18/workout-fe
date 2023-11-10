"use client";

import { useState } from "react";
import ClientModal from "@/components/ClientModal";
import Form from "@/components/forms/Form";

type ExerciseInputModalProps = {
  onSubmit: (e: ExerciseInputModalState) => void;
  onDeleteButtonClick?: () => void;
  inputType: "create" | "update";
  exerciseTypeName: string;
  handleClose?: () => void;
  initalValues?: {
    weight?: number;
    reps?: number;
  };
};

export type ExerciseInputModalState = {
  weight: number;
  reps: number;
};

export default function ExerciseInputModal({
  onSubmit,
  onDeleteButtonClick,
  inputType,
  exerciseTypeName,
  handleClose,
  initalValues,
}: ExerciseInputModalProps) {
  const [weight, setWeight] = useState<string>(
    initalValues?.weight?.toString() || "",
  );
  const [reps, setReps] = useState<string>(
    initalValues?.reps?.toString() || "",
  );
  const weightAsNumber = parseFloat(weight);
  const repsAsNumber = parseFloat(reps);

  const saveButtonText = inputType == "create" ? "Create" : "Update";

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // If either weight or reps is undefined, prevent the form from submitting and show an error.
    if (Number.isNaN(weightAsNumber) || Number.isNaN(repsAsNumber)) {
      alert("Weight and reps must be numbers");
      return;
    }
    onSubmit({ weight: weightAsNumber, reps: repsAsNumber });
  };

  const onWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  };
  const onRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReps(e.target.value);
  };

  return (
    <ClientModal handleClose={handleClose}>
      <Form onSubmit={onFormSubmit}>
        <div className="flex flex-row justify-between items-center mt-4 mb-6">
          <h2 className="text-2xl font-bold">{exerciseTypeName}</h2>
          <div className="text-base text-red-600">
            {inputType == "update" && (
              <TrashButton onTrashClick={onDeleteButtonClick} />
            )}
          </div>
        </div>
        <label
          htmlFor="weight"
          className="mb-3 text-gray-700 dark:text-gray-100 flex flex-col"
        >
          <p className="mb-1">Weight</p>
          <input
            className="dark:text-gray-900 rounded-md border border-gray-300"
            id="weight"
            type="number"
            name="Weight"
            value={weight}
            onChange={onWeightChange}
            step="any"
          />
        </label>
        <label
          htmlFor="weight"
          className="mb-3 text-gray-700 dark:text-gray-100 flex flex-col"
        >
          <p className="mb-1">Reps</p>
          <input
            className="dark:text-gray-900 rounded-md border border-gray-300"
            id="Reps"
            type="number"
            name="Reps"
            value={reps}
            onChange={onRepsChange}
            step="any"
          />
        </label>
        <div className="flex flex-row justify-evenly items-center mt-4">
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
            {saveButtonText}
          </button>
        </div>
      </Form>
    </ClientModal>
  );
}

function TrashButton({ onTrashClick }: { onTrashClick?: () => void }) {
  return (
    <div className="text-base text-red-600">
      <button
        type="button"
        disabled={!onTrashClick}
        onClick={onTrashClick}
        title="Delete set"
      >
        <i className="fi fi-rs-trash-xmark text-lg px-4" />
      </button>
    </div>
  );
}
