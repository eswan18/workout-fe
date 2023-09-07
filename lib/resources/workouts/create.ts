"use server";

import { Workout } from "../apiTypes";
import {
  post,
  RequestResult,
  newRequestFailure,
  newRequestSuccess,
} from "@/lib/requests";

const route = `/workouts/`;

export async function createWorkout({
  workout,
}: {
  workout: Workout;
}): Promise<RequestResult<Workout>> {
  const result = (await post({
    route,
    body: JSON.stringify(workout),
  })) as RequestResult<Workout[]>;
  if (!result.success) {
    return result;
  }
  if (result.data.length > 1) {
    return await newRequestFailure(
      new Error("Warning: more than one workout was created"),
    );
  }
  const createdWorkout = result.data[0];
  return await newRequestSuccess(createdWorkout);
}
