import { useState } from "react";
import ClientModal from "@/components/ClientModal";
import SolidButton from "@/components/buttons/SolidButton";
import GhostButton from "@/components/buttons/GhostButton";
import Input from "@/components/forms/Input";
import Form from "@/components/forms/Form";
import NumericInput from "@/components/forms/NumericInput";

type ExerciseInputModalProps = {
  onSubmit: (e: ExerciseInputModalState) => void;
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

export default function ExerciseInputModal({onSubmit, exerciseTypeName, handleClose, initalValues }: ExerciseInputModalProps) {
  const [weight, setWeight] = useState<number | undefined>(initalValues?.weight);
  const [reps, setReps] = useState<number | undefined>(initalValues?.reps);
  const buttonEnabled = (weight != null) && (reps != null);

  return (
    <ClientModal handleClose={ handleClose }>
      <Form title={`${exerciseTypeName}`} onSubmit={() => {weight && reps && onSubmit({weight, reps})}}>
        <NumericInput label="Weight" htmlFor="weight" type="number" step="0.5" id="weight" name="Weight" placeholder="9000" value={weight} onValueUpdate={setWeight} />
        <NumericInput label="Reps" htmlFor="reps" type="number" step="1" id="reps" name="Reps" placeholder="42"  value={reps} onValueUpdate={setReps} />
        <div className="flex flex-row justify-evenly items-center mt-4" >
          <span className="text-sm">
            <GhostButton type="button" onClick={handleClose}>Cancel</GhostButton>
          </span>
          <span className="text-xl">
            <SolidButton type="submit" enabled={buttonEnabled}>Save</SolidButton>
          </span>
        </div>
      </Form>
    </ClientModal>
  )
}