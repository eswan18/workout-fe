"use server";

import { get } from "@/lib/requests";
import { Exercise } from "@/lib/resources/apiTypes";

const ROUTE = "/exercises/";

export async function getExercisesByWorkoutId(
  workoutId: string,
): Promise<Exercise[]> {
  return (await get({
    route: ROUTE,
    params: { workout_id: workoutId },
  })) as Exercise[];
}
