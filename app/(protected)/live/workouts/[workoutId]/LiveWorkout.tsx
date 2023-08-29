'use client'

import { useState } from "react";
import { WorkoutWithType } from "@/lib/resources/apiTypes";
import { ExerciseSet } from "@/lib/resources/derived/workoutWithDetails";
import ExerciseSetWidget from "./ExerciseSetWidget";
import CreateNewExerciseWidget from "./CreateNewExerciseSetWidget";

type ExerciseSetAndKey = {
  exerciseSet?: ExerciseSet;
  key: number;
};

export default function WorkoutLogPageClient({ workout, exerciseSets }: { workout: WorkoutWithType, exerciseSets: ExerciseSet[] }) {
  // Since users will be able to modify exercises and add new ones, we need to track whether each is saved.
  const defaultSetsWithSaveStatus = exerciseSets.map((exSet, idx) => ({...exSet, key: idx}));

  const [setsWithSaveStatus, setSetsWithSaveStatus] = useState<ExerciseSetAndKey[]>(defaultSetsWithSaveStatus);
  const appendNewExerciseSet = () => {
    // This feels janky, but we need a unique key for each set that is constant across renders.
    const newKey = Math.random();
    setSetsWithSaveStatus([...setsWithSaveStatus, {exerciseSet: undefined, key: newKey}])
  }
  return (
    <main>
      <h1 className="text-xl m-2">Live Workout</h1>
      {
        setsWithSaveStatus.map((set) => {
          return <ExerciseSetWidget exerciseType={ set.exerciseSet?.exerciseType } exercises={ set.exerciseSet?.exercises || [] } key={ set.key }/>
        })
      }
      <CreateNewExerciseWidget addNewExerciseSet={ appendNewExerciseSet } />
    </main>
  )
}