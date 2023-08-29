'use client'

import { useState, useEffect } from "react";
import { Exercise, ExerciseType } from "@/lib/resources/apiTypes";
import CreateNewExerciseWidget from "./CreateNewExerciseWidget";
import { getAllExerciseTypes } from "@/lib/resources/exerciseTypes/getExerciseTypes";
import ExerciseWidget from "./ExerciseWidget";
import LoadingSpinner from "@/components/LoadingSpinner";


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
    // Show a modal to let the user pick weight and reps.
    const newExercise = { weight: 0, reps: 0, exercise_type_id: type.id, workout_id: workoutId };
    setExercisesWithKeys([...exercisesWithKeys, { exercise: newExercise, key: newKey }])
  }



  return (
    <div className="w-full rounded-lg p-2 lg:p-4 h-32 shadow-lg bg-fuchsia-50 m-1 lg:m-2">
      {isLoading ? <LoadingSpinner /> :
        type ?
          <ExercisePanel type={type} exercisesWithKeys={exercisesWithKeys} appendNewExercise={appendNewExercise} />
          :
          <ExerciseTypeSelector setType={setType} exTypeOptions={exTypeOptions} />
      }
    </div>
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
      <h2>{type.name}</h2>
      <div className="flex flex-row justify-left">
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
      {exTypeOptions.map((type) => <option value={type.name}>{type.name}</option>)}
    </select>
  )
}