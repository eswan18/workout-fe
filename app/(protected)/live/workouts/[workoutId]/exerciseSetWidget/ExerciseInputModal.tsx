import { useState } from "react";
import ClientModal from "@/components/ClientModal";
import SolidButton from "@/components/buttons/SolidButton";
import GhostButton from "@/components/buttons/GhostButton";
import Form from "@/components/forms/Form";

type ExerciseInputModalProps = {
  onSubmit: (e: ExerciseInputModalState) => void;
  inputType: "create" | "update";
  exerciseTypeName: string;
  handleClose?: () => void
  initalValues?: {
    weight?: number;
    reps?: number;
  }
}

export type ExerciseInputModalState = {
  weight: number
  reps: number
}

export default function ExerciseInputModal({onSubmit, inputType, exerciseTypeName, handleClose, initalValues }: ExerciseInputModalProps) {
  const [weight, setWeight] = useState<string>(initalValues?.weight?.toString()|| "");
  const [reps, setReps] = useState<string>(initalValues?.reps?.toString() || "");
  const weightAsNumber = parseFloat(weight);
  const repsAsNumber = parseFloat(reps);

  const saveButtonEnabled = (weight !== "") && (reps !== "");
  const saveButtonText = inputType == "create" ? "Create" : "Update";

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // If either weight or reps is undefined, prevent the form from submitting and show an error.
    if (Number.isNaN(weightAsNumber) || Number.isNaN(repsAsNumber)) {
      alert("Weight and reps must be numbers")
      return;
    }
    onSubmit({weight: weightAsNumber, reps: repsAsNumber})
  }

  const onWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value);
  }
  const onRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReps(e.target.value);
  }

  return (
    <ClientModal handleClose={ handleClose }>
      <Form onSubmit={onFormSubmit}>
        <div className="flex flex-row justify-between items-center mt-4" >
          <h2 className="text-2xl font-bold my-2">{exerciseTypeName}</h2>
          <div className="text-base text-red-600">
            { inputType == "update" && <i className="fa-regular fa-trash-can px-4" /> }
          </div>
        </div>
        <label htmlFor="weight" className="mb-3 text-gray-700 dark:text-gray-100 flex flex-col">
          <p className="mb-1">Weight</p>
          <input className='dark:text-gray-900 rounded-md border border-gray-300' id="weight" type="number" name="Weight" value={weight} onChange={onWeightChange} step="any" />
        </label>
        <label htmlFor="weight" className="mb-3 text-gray-700 dark:text-gray-100 flex flex-col">
          <p className="mb-1">Reps</p>
          <input className='dark:text-gray-900 rounded-md border border-gray-300' id="Reps" type="number" name="Reps" value={reps} onChange={onRepsChange} step="any" />
        </label>
        <div className="flex flex-row justify-evenly items-center mt-4" >
          <span className="text-base">
            <GhostButton type="button" onClick={handleClose}>Cancel</GhostButton>
          </span>
          <span className="text-xl">
            <SolidButton type="submit" enabled={saveButtonEnabled}>{ saveButtonText }</SolidButton>
          </span>
        </div>
      </Form>
    </ClientModal>
  )
}