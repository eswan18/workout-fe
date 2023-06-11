'use client'

import { Workout, WorkoutType, Exercise, ExerciseType } from '@/lib/apiTypes'
import AddNewExerciseWidget from './addNewExerciseWidget'

interface WorkoutLogProps {
  workout: Workout
  workoutType?: WorkoutType
  exercises: Array<Exercise>
  exerciseTypes: Array<ExerciseType>
}

export default function WorkoutLog({ workout, workoutType, exercises, exerciseTypes }: WorkoutLogProps) {
  const wkt = JSON.stringify(workout)
  const ex = JSON.stringify(exercises)
  console.dir(workout)
  console.dir(workoutType)
  console.dir(exercises)
  const wktTypeName = workoutType?.name || 'Unclassified'

  return (
    <div>
      <h1>{ wktTypeName } workout</h1>
      <h3>{ exercises.length } exercises</h3>
      <p>{wkt}</p>
      <p>{ex}</p>
      <AddNewExerciseWidget exerciseTypes={ exerciseTypes } />
    </div>
  )
}