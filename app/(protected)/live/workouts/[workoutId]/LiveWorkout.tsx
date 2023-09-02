'use client'

import { useState } from "react";
import { Exercise, ExerciseType, WorkoutWithType } from "@/lib/resources/apiTypes";
import { ExerciseSet } from "@/lib/resources/derived/workoutWithDetails";
import ExerciseGroupWidget, { LoadingExercise, ExerciseOrLoading } from './exerciseGroupWidget';
import CreateNewExerciseGroupWidget from "./CreateNewExerciseGroupWidget";
import ExerciseGroupInputModal, { ExerciseGroupInputModalState } from "./exerciseGroupWidget/ExerciseGroupInputModal";
import ExerciseInputModal, { ExerciseInputModalState } from "./exerciseGroupWidget/ExerciseInputModal";
import { createExercise, overwriteExercise } from "@/lib/resources/exercises";
import { deleteExercise } from "@/lib/resources/exercises/delete";

type ExerciseGroup = {
  exerciseType?: ExerciseType;
  exercises: (ExerciseOrLoading)[];
  key: number;
}

type LiveWorkoutProps = {
  workout: WorkoutWithType;
  exerciseSets: ExerciseSet[];
  exerciseTypes: ExerciseType[];
}

export default function LiveWorkout({ workout, exerciseSets, exerciseTypes }: LiveWorkoutProps) {
  // Sets aren't a construct in the database, so we need to add an artificial key to each set.
  const initialGroups: ExerciseGroup[] = exerciseSets.map((set) => ({exerciseType: set.exerciseType, exercises: set.exercises, key: Math.random()}));
  const [modal, setModal] = useState<React.ReactElement | null>(null);

  const [groups, setGroups] = useState<ExerciseGroup[]>(initialGroups);
  const addSet = (exerciseType: ExerciseType | undefined, exercises: Exercise[]) => {
    setGroups([...groups, {exerciseType, exercises, key: Math.random()}])
  }
  const deleteSetByKey = (key: number) => {
    setGroups(groups.filter((g) => g.key !== key))
  }
  const setExercisesForGroup = (key: number, exercises: ExerciseOrLoading[]) => {
    const newGroups = groups.map((g) => {
      if (g.key === key) {
        return {...g, exercises}
      }
      return g
    })
    setGroups(newGroups)
  }

  // This is triggered when the user clicks the "New exercise" button.
  const onClickCreateNewExerciseGroup = () => {
    const onSubmit = (e: ExerciseGroupInputModalState) => {
      setModal(null);
      if (!e.exerciseTypeId) {
        return;
      }
      // Get the exercise type for the given ID.
      const exerciseType = exerciseTypes.find((type) => type.id === e.exerciseTypeId);
      if (!exerciseType) {
        // This should never happen.
        throw new Error("exercise type not found")
      }
      addSet(exerciseType, []);
    }
    setModal(<ExerciseGroupInputModal exerciseTypes={exerciseTypes} onSubmit={onSubmit} handleClose={() => setModal(null)} />)
  }

  function openNewExerciseModal ({exerciseType, exercises, setExercises}: {exerciseType: ExerciseType, exercises: ExerciseOrLoading[], setExercises: (exercises: ExerciseOrLoading[]) => void}) {
    // This feels janky, but we need a unique key for each exercise that is constant across renders.
    function onSubmit({weight, reps}: ExerciseInputModalState) {
      const newExercise: Exercise = {
        workout_id: workout.id,
        exercise_type_id: exerciseType.id as string,
        weight,
        reps,
        start_time: new Date(),
      }
      createExercise(newExercise).then((ex) => {
        console.log('new ex', ex)
        setExercises([...exercises, ex])
      })
      setModal(null);
    }
    setModal(<ExerciseInputModal
      onSubmit={onSubmit}
      inputType="create"
      exerciseTypeName={exerciseType.name}
      handleClose={ () => setModal(null) }
    />)
  }

  function openEditExerciseModal(exerciseId: string, {exerciseType, exercises, setExercises}: {exerciseType: ExerciseType, exercises: ExerciseOrLoading[], setExercises: (exercises: ExerciseOrLoading[]) => void}) {
    const thisExercise = exercises.find((ex) => (ex.id === exerciseId)) as Exercise | undefined;
    if (thisExercise === undefined) { return }
    const onSubmit = (modalState: ExerciseInputModalState) => {
      // On submit, we update the exercise both in page state and in the database.
      setExercises(exercises.map((ex) => {
        if (ex.id === exerciseId) {
          const newExercise = {...ex, ...modalState}
          overwriteExercise({id: exerciseId, exercise: newExercise as Exercise})
          return newExercise
        } else {
          return ex
        }
      }))
      setModal(null);
    }
    const onDeleteButtonClick = () => {
      // On delete, we remove the exercise from page state and from the database.
      setExercises(exercises.filter((ex) => ex.id !== exerciseId))
      deleteExercise(exerciseId)
      setModal(null);
    }
    setModal(<ExerciseInputModal
      initalValues={{weight: thisExercise.weight, reps: thisExercise.reps}}
      onDeleteButtonClick={onDeleteButtonClick}
      inputType="update"
      onSubmit={onSubmit}
      exerciseTypeName={exerciseType.name}
      handleClose={ () => setModal(null) }
    />)
  }

  const workoutName = workout.workout_type_name || "Custom Workout";
  return (
    <main>
      <h1 className="text-3xl m-2 text-center my-4 lg:my-10">{ workoutName }</h1>
      {
        groups.map(({exerciseType, exercises, key}) => {
          const setExercises = (exercises: ExerciseOrLoading[]) => setExercisesForGroup(key, exercises);
          function onClickCreateNewExercise(): void {
            openNewExerciseModal({exerciseType: exerciseType as ExerciseType, exercises, setExercises});
          }
          function onClickEditExercise(exerciseId: string): void {
            openEditExerciseModal(exerciseId, {exerciseType: exerciseType as ExerciseType, exercises, setExercises});
          }
          if (!exerciseType) { return }
          return (
            <ExerciseGroupWidget
              exerciseType={exerciseType}
              exercises={exercises}
              onClickCreateNewExercise={onClickCreateNewExercise}
              onClickEditExercise={onClickEditExercise}
              key={key}
            />
          )
        })
      }
      <CreateNewExerciseGroupWidget onClick={ onClickCreateNewExerciseGroup } />
      { modal }
    </main>
  )
}