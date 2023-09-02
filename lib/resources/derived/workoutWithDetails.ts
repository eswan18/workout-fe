'use server'

import { get } from '@/lib/requests';
import { WorkoutWithDetails, WorkoutWithType, Exercise, ExerciseWithType, ExerciseType } from '@/lib/resources/apiTypes';

const ROUTE = '/derived/workout_details/'

function convertDates(workout: WorkoutWithDetails): WorkoutWithDetails {
  // Fix a couple of columns that should be typed as dates.
  const wkt = {...workout};
  wkt.workout.start_time = new Date(wkt.workout.start_time);
  if (wkt.workout.end_time) {
    wkt.workout.end_time = new Date(wkt.workout.end_time);
  }
  wkt.exercises.forEach((exercise) => {
    if (exercise.start_time) {
      exercise.start_time = new Date(exercise.start_time);
    }
  })
  return wkt
}

export async function getAllWorkoutsWithDetails(): Promise<WorkoutWithDetails[]> {
  const wktsWithDtls = await get({route: ROUTE}) as WorkoutWithDetails[];
  return wktsWithDtls.map((wktWithDtls) => convertDates(wktWithDtls));
}

export async function getWorkoutWithDetails(id: string): Promise<WorkoutWithDetails> {
  const wktWithDtls = await get({route: `${ROUTE}${id}`}) as WorkoutWithDetails;
  const wktWithDtlsTyped = convertDates(wktWithDtls);
  return wktWithDtlsTyped;
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
    const aStart = a.start_time;
    const bStart = b.start_time;
    if (aStart == null && bStart == null) {
      return 0;
    } else if (aStart == null) {
      return -1;
    } else if (bStart == null) {
      return 1;
    } else {
      return aStart.getTime() - bStart.getTime();
    }
  });
}

function groupExercises(exercises: ExerciseWithType[]): ExerciseSet[] {
  let lastSeenTypeId: string | undefined = undefined;
  let exerciseSets: ExerciseSet[] = [];
  let currentSet: ExerciseSet | undefined = undefined;
  exercises.forEach((exercise) => {
    // If there's no active set or if we have a new exercise type, start a new set.
    if (!currentSet || exercise.exercise_type_id !== lastSeenTypeId) {
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
      exerciseSets.push(currentSet);
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
  const x = {
    workout: wktWithDtls.workout,
    exerciseSets: exerciseSets
  };
  return x
}