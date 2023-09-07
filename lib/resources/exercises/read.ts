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
  return result;
}
