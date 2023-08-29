'use client'

import { useState } from "react";
import { WorkoutWithType } from "@/lib/resources/apiTypes";
import { ExerciseSet } from "@/lib/resources/derived/workoutWithDetails";
import ExerciseSetWidget from "./exerciseSetWidget";
import CreateNewExerciseSetWidget from "./CreateNewExerciseSetWidget";

type ExerciseSetAndKey = {
  exerciseSet?: ExerciseSet;
  key: number;
};

export default function LiveWorkout({ workout, exerciseSets }: { workout: WorkoutWithType, exerciseSets: ExerciseSet[] }) {
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
      <h1 className="text-3xl m-2 text-center my-4 lg:my-10">Live Workout</h1>
      {
        setsWithSaveStatus.map((set) => {
          return <ExerciseSetWidget workoutId={ workout.id } exerciseType={ set.exerciseSet?.exerciseType } exercises={ set.exerciseSet?.exercises || [] } key={ set.key }/>
        })
      }
      <CreateNewExerciseSetWidget addNewExerciseSet={ appendNewExerciseSet } />
    </main>
  )
}