"use server";

import {
  get,
  newRequestFailure,
  newRequestSuccess,
  RequestResult,
} from "@/lib/requests";
import { WorkoutType } from "../apiTypes";

const route = "/workout_types/";

export async function getAllWorkoutTypes(): Promise<
  RequestResult<WorkoutType[]>
> {
  const result = (await get({ route })) as RequestResult<WorkoutType[]>;
  return result;
}

export async function getWorkoutTypeById(
  id: string,
): Promise<RequestResult<WorkoutType>> {
  const result = (await get({
    route: route,
    params: { id },
  })) as RequestResult<WorkoutType[]>;
  if (!result.success) {
    return await newRequestFailure(
      new Error(`Multiple workout types found with id ${id}`),
    );
  }
  const workoutType = result.data[0];
  return await newRequestSuccess(workoutType);
}
