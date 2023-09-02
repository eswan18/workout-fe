'use client'

import { Exercise, ExerciseType } from "@/lib/resources/apiTypes";
import CreateNewExerciseWidget from "./CreateNewExerciseWidget";
import ExerciseWidget from "./ExerciseWidget";
import { SaveStatus } from "@/components/indicators/SaveStatusIndicator";

type ExerciseWithKey = {
  exercise: Exercise;
  saveStatus: SaveStatus;
  key: number;
}

type ExerciseGroupWidgetProps = {
  exerciseType: ExerciseType;
  exercises: (Exercise | LoadingExercise)[];
  onClickCreateNewExercise: () => void;
  onClickEditExercise: (exerciseId: string) => void;
}

export type LoadingExercise = {
  id: number;
  isLoading: true;
}

export type ExerciseOrLoading = Exercise | LoadingExercise;

export default function ExerciseGroupWidget({ exerciseType, exercises, onClickCreateNewExercise, onClickEditExercise }: ExerciseGroupWidgetProps) {
  return (
    <>
      <h2 className="text-xl"><i className="fa-solid fa-dumbbell" /> {exerciseType.name}</h2>
      <div className="flex flex-row justify-left overflow-x-scroll">
        {
          exercises.map((ex) => {
            if ('isLoading' in ex) { return }
            return (
              <ExerciseWidget
                weight={ex.weight as number}
                reps={ex.reps as number}
                saveStatus="saved"
                onEditButtonClick={() => onClickEditExercise(ex.id as string)}
                key={ex.id}
              />
            )
          })
        }
        <CreateNewExerciseWidget onClick={onClickCreateNewExercise} />
      </div>
    </>
  )
}