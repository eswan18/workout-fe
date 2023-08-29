'use server'

import { get } from '@/lib/requests';
import { WorkoutWithDetails, WorkoutWithType, Exercise, ExerciseWithType, ExerciseType } from '@/lib/resources/apiTypes';

const ROUTE = '/derived/workout_details/'

export async function getWorkoutWithDetails(id: string): Promise<WorkoutWithDetails> {
  return await get({route: `${ROUTE}${id}`}) as WorkoutWithDetails;
}

export type ExerciseSet = {
  exerciseType: ExerciseType;
  exercises: Exercise[];
}

export type WorkoutWithExerciseSets = {
  workout: WorkoutWithType;
  exerciseSets: ExerciseSet[];
}

function sortExercises(exercises: ExerciseWithType[]): ExerciseWithType[] {
  let exCopy = [...exercises];
  return exCopy.sort((a, b) => {
    if (!a.start_time && !b.start_time) {
      return 0;
    } else if (!a.start_time) {
      return 1;
    } else if (!b.start_time) {
      return -1;
    } else {
      return a.start_time.getTime() - b.start_time.getTime();
    }
  });
}

function groupExercises(exercises: ExerciseWithType[]): ExerciseSet[] {
  let lastSeenTypeId: string | null = null;
  let exerciseSets: ExerciseSet[] = [];
  let currentSet: ExerciseSet | null = null;
  exercises.forEach((exercise) => {
    if (exercise.exercise_type_id !== lastSeenTypeId) {
      // Push the current set if there is one.
      currentSet && exerciseSets.push(currentSet);
      currentSet = null;
    }
    if (!currentSet) {
      // Create a new, empty set with the current exercise type.
      currentSet = {
        exerciseType: {
          id: exercise.exercise_type_id,
          name: exercise.exercise_type_name,
          number_of_weights: exercise.number_of_weights,
          notes: exercise.exercise_type_notes,
          owner_user_id: exercise.exercise_type_owner_user_id
        },
        exercises: []
      };
    }
    currentSet.exercises.push({
      id: exercise.id,
      start_time: exercise.start_time,
      weight: exercise.weight,
      weight_unit: exercise.weight_unit,
      reps: exercise.reps,
      seconds: exercise.seconds,
      notes: exercise.notes,
      workout_id: exercise.workout_id,
      user_id: exercise.user_id,
      exercise_type_id: exercise.exercise_type_id
    });
    lastSeenTypeId = exercise.exercise_type_id;
  });
  return exerciseSets;
}

// Returns workout details as info about the workout and exercises in groups based on
// multiple iterations of the same type of exercise.
export async function getWorkoutWithDetailsAsExerciseSets(id: string): Promise<WorkoutWithExerciseSets> {
  const wktWithDtls = await getWorkoutWithDetails(id);
  // Sort the exercises by start time, and put nulls last.
  const exercises = sortExercises(wktWithDtls.exercises);
  const exerciseSets = groupExercises(exercises);
  return {
    workout: wktWithDtls.workout,
    exerciseSets: exerciseSets
  };
}