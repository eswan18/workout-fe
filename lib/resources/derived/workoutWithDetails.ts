"use server";

import {
  get,
  newRequestFailure,
  newRequestSuccess,
  RequestResult,
} from "@/lib/requests";
import {
  WorkoutWithDetails,
  WorkoutWithType,
  Exercise,
  ExerciseWithType,
  ExerciseType,
} from "@/lib/resources/apiTypes";

const ROUTE = "/derived/workout_details/";

function convertDates(workout: WorkoutWithDetails): WorkoutWithDetails {
  // Fix a couple of columns that should be typed as dates.
  const wkt = { ...workout };
  wkt.workout.start_time = new Date(wkt.workout.start_time);
  if (wkt.workout.end_time) {
    wkt.workout.end_time = new Date(wkt.workout.end_time);
  }
  wkt.exercises.forEach((exercise) => {
    if (exercise.start_time) {
      exercise.start_time = new Date(exercise.start_time);
    }
  });
  return wkt;
}

type GetAllWorkoutsWithDetailsParams = {
  limit?: number;
};

export async function getAllWorkoutsWithDetails({
  limit,
}: GetAllWorkoutsWithDetailsParams): Promise<
  RequestResult<WorkoutWithDetails[]>
> {
  const params = limit ? { limit: limit.toString() } : undefined;
  const result = (await get({
    route: ROUTE,
    params,
  })) as RequestResult<WorkoutWithDetails[]>;
  if (!result.success) {
    return result;
  }
  const wktsWithDtls = result.data.map((wktWithDtls) =>
    convertDates(wktWithDtls),
  );
  return await newRequestSuccess(wktsWithDtls);
}

export async function getWorkoutWithDetails(
  id: string,
): Promise<RequestResult<WorkoutWithDetails>> {
  const params = { id };
  const result = (await get({
    route: ROUTE,
    params,
  })) as RequestResult<WorkoutWithDetails[]>;
  if (!result.success) {
    return result;
  }
  if (result.data.length > 1) {
    return await newRequestFailure(
      new Error(`Multiple workouts found with id ${id}`),
    );
  }
  const wktWithDtls = result.data[0];
  const wktWithDtlsTyped = convertDates(wktWithDtls);
  return await newRequestSuccess(wktWithDtlsTyped);
}

export type ExerciseSet = {
  exerciseType: ExerciseType;
  exercises: Exercise[];
};

export type WorkoutWithExerciseSets = {
  workout: WorkoutWithType;
  exerciseSets: ExerciseSet[];
};

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
          owner_user_id: exercise.exercise_type_owner_user_id,
        },
        exercises: [],
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
      exercise_type_id: exercise.exercise_type_id,
    });
    lastSeenTypeId = exercise.exercise_type_id;
  });
  return exerciseSets;
}

// Returns workout details as info about the workout and exercises in groups based on
// multiple iterations of the same type of exercise.
export async function getWorkoutWithDetailsAsExerciseSets(
  id: string,
): Promise<RequestResult<WorkoutWithExerciseSets>> {
  const result = await getWorkoutWithDetails(id);
  if (!result.success) {
    return result;
  }
  const wktWithDtls = result.data;
  // Sort the exercises by start time, and put nulls last.
  const exercises = sortExercises(wktWithDtls.exercises);
  const exerciseSets = groupExercises(exercises);
  return await newRequestSuccess({
    workout: wktWithDtls.workout,
    exerciseSets: exerciseSets,
  });
}
