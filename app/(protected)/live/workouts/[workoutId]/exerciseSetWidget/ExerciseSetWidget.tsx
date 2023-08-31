'use client'

import { useState, useEffect, ReactElement } from "react";
import { Exercise, ExerciseType } from "@/lib/resources/apiTypes";
import CreateNewExerciseWidget from "./CreateNewExerciseWidget";
import { getAllExerciseTypes } from "@/lib/resources/exerciseTypes/getExerciseTypes";
import ExerciseWidget from "./ExerciseWidget";
import LoadingSpinner from "@/components/LoadingSpinner";
import ClientModal from "@/components/ClientModal";
import SolidButton from "@/components/buttons/SolidButton";
import Input from "@/components/forms/Input";
import Form from "@/components/forms/Form";
import GhostButton from "@/components/buttons/GhostButton";


type ExerciseWithKey = {
  exercise: Exercise;
  key: number;
}

type ExerciseSetWidgetProps = {
  exerciseType?: ExerciseType;
  exercises: Exercise[];
  workoutId: string;
}

export default function ExerciseSetWidget({ exerciseType, exercises, workoutId }: ExerciseSetWidgetProps) {
  const exesWithKeys: ExerciseWithKey[] = exercises.map((ex, idx) => ({ exercise: ex, key: idx }));
  const [type, setType] = useState<ExerciseType | undefined>(exerciseType);
  const [exercisesWithKeys, setExercisesWithKeys] = useState<ExerciseWithKey[]>(exesWithKeys);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [exTypeOptions, setExTypeOptions] = useState<ExerciseType[]>([]);
  const [modal, setModal] = useState<ReactElement | null>(null);

  useEffect(() => {
    getAllExerciseTypes().then((types) => {
      setExTypeOptions(types);
      setIsLoading(false);
    })
  }, [])

  const appendNewExercise = () => {
    if (!type || !type.id) {
      // This should never happen.
      alert("choose an exercise type first!")
      return;
    }
    // This feels janky, but we need a unique key for each exercise that is constant across renders.
    const newKey = Math.random();
    function onSubmit({weight, reps}: ExerciseInputModalState) {
      if (!type || !type.id) {
        // This should never happen.
        throw new Error("can't create new exercise because no exercise type is selected")
      }
      const newExercise = {
        workout_id: workoutId,
        exercise_type_id: type.id,
        weight,
        reps,
        start_time: new Date(),
      }
      setExercisesWithKeys([...exercisesWithKeys, { exercise: newExercise, key: newKey }])
      setModal(null);
    }
    setModal(<ExerciseInputModal onSubmit={onSubmit} exerciseTypeName={type.name} handleClose={ () => setModal(null) } />)
  }

  return (
    <div className="w-full rounded-lg p-2 lg:p-4 shadow-lg bg-fuchsia-50 m-1 lg:m-2">
      {isLoading ? <LoadingSpinner /> :
        type ?
          <ExercisePanel type={type} exercisesWithKeys={exercisesWithKeys} appendNewExercise={appendNewExercise} />
          :
          <ExerciseTypeSelector setType={setType} exTypeOptions={exTypeOptions} />
      }
      { modal }
    </div>
  )
}

type ExerciseInputModalProps = {
  onSubmit: (e: ExerciseInputModalState) => void;
  exerciseTypeName: string;
  handleClose?: () => void
}

type ExerciseInputModalState = {
  weight: number
  reps: number
}

function ExerciseInputModal({onSubmit, exerciseTypeName, handleClose }: ExerciseInputModalProps) {
  const [weight, setWeight] = useState<number | undefined>(undefined);
  const [reps, setReps] = useState<number | undefined>(undefined);
  const buttonEnabled = (weight != null) && (reps != null);

  return (
    <ClientModal handleClose={ handleClose }>
      <Form title="Record exercise" onSubmit={() => {weight && reps && onSubmit({weight, reps})}}>
        <Input label="Weight" htmlFor="weight" type="number" step="0.5" id="weight" name="Weight" placeholder="9000" onValueUpdate={setWeight} />
        <Input label="Reps" htmlFor="reps" type="number" step="1" id="reps" name="Reps" placeholder="42" onValueUpdate={setReps} />
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

type ExercisePanelProps = {
  type: ExerciseType;
  exercisesWithKeys: ExerciseWithKey[];
  appendNewExercise: () => void;
}

function ExercisePanel({ type, exercisesWithKeys, appendNewExercise }: ExercisePanelProps) {
  return (
    <>
      <h2 className="text-xl"><i className="fa-solid fa-dumbbell" /> {type.name}</h2>
      <div className="flex flex-row justify-left overflow-x-scroll">
        {exercisesWithKeys.map((ex) => <ExerciseWidget exercise={ex.exercise} key={ex.key} />)}
        <CreateNewExerciseWidget addNewExercise={appendNewExercise} />
      </div>
    </>
  )
}

type ExerciseTypeSelectorProps = {
  setType: (type: ExerciseType | undefined) => void;
  exTypeOptions: ExerciseType[];
}

function ExerciseTypeSelector({ setType, exTypeOptions }: ExerciseTypeSelectorProps) {
  return (
    <select className="w-full rounded-lg p-2 lg:p-4 shadow-lg m-1 lg:m-2" onChange={(e) => setType(exTypeOptions.find((type) => type.name === e.target.value))}>
      <option value="">Choose an exercise type</option>
      {exTypeOptions.map((type) => <option value={type.name} key={type.id}>{type.name}</option>)}
    </select>
  )
}