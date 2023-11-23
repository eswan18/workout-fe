"use server";

import { get, RequestResult } from "@/lib/requests";
import { Exercise } from "@/lib/resources/apiTypes";

const ROUTE = "/exercises/";

export async function getExercisesByWorkoutId(
  workoutId: string,
): Promise<RequestResult<Exercise[]>> {
  const result = (await get({
    route: ROUTE,
    params: { workout_id: workoutId },
  })) as RequestResult<Exercise[]>;
  if (result.success) {
    result.data = await Promise.all(result.data.map(fixTypes));
  }
  return result;
}

export async function fixTypes(exercise: Exercise): Promise<Exercise> {
  exercise = { ...exercise };
  // if "start_time" is a string, convert it to a Date
  if (typeof exercise.start_time === "string") {
    exercise.start_time = new Date(exercise.start_time);
  }
  return exercise;
}
