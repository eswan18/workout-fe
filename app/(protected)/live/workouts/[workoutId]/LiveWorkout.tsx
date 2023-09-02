'use client'

import { useState } from "react";
import { WorkoutWithType } from "@/lib/resources/apiTypes";
import { ExerciseSet } from "@/lib/resources/derived/workoutWithDetails";
import ExerciseSetWidget from "./exerciseSetWidget";
import CreateNewExerciseSetWidget from "./CreateNewExerciseSetWidget";

type ExerciseSetAndKey = {
  set?: ExerciseSet;
  key: number;
};

export default function LiveWorkout({ workout, exerciseSets }: { workout: WorkoutWithType, exerciseSets: ExerciseSet[] }) {
  const defaultSets: ExerciseSetAndKey[] = exerciseSets.map((exSet, idx) => ({set: exSet, key: idx}));
  const workoutName = workout.workout_type_name || "Custom Workout";

  const [setsWithKeys, setSetsWithKeys] = useState<ExerciseSetAndKey[]>(defaultSets);
  const appendNewExerciseSet = () => {
    // This feels janky, but we need a unique key for each set that is constant across renders.
    const newKey = Math.random();
    setSetsWithKeys([...setsWithKeys, {set: undefined, key: newKey}])
  }
  return (
    <main>
      <h1 className="text-3xl m-2 text-center my-4 lg:my-10">{ workoutName }</h1>
      {
        setsWithKeys.map(({set, key}) => {
          return <ExerciseSetWidget workoutId={ workout.id } exerciseType={ set?.exerciseType } exercises={ set?.exercises || [] } key={ key }/>
        })
      }
      <CreateNewExerciseSetWidget addNewExerciseSet={ appendNewExerciseSet } />
    </main>
  )
}