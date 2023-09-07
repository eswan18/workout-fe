"use server";

import {
  get,
  RequestResult,
  newRequestFailure,
  newRequestSuccess,
} from "@/lib/requests";
import { Workout } from "@/lib/resources/apiTypes";

const ROUTE = `/workouts/`;

export async function getWorkoutById(
  id: string,
): Promise<RequestResult<Workout>> {
  const result = (await get({ route: ROUTE, params: { id } })) as RequestResult<
    Workout[]
  >;
  if (!result.success) {
    return result;
  }
  if (result.data.length > 1) {
    return await newRequestFailure(
      new Error(`Multiple workouts found with id ${id}`),
    );
  }
  const workout = result.data[0];
  return await newRequestSuccess(workout);
}

export async function getAllWorkouts(): Promise<RequestResult<Workout[]>> {
  return (await get({ route: ROUTE })) as RequestResult<Workout[]>;
}
