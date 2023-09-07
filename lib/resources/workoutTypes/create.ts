"use server";

import {
  RequestResult,
  post,
  newRequestFailure,
  newRequestSuccess,
} from "@/lib/requests";
import { WorkoutType } from "@/lib/resources/apiTypes";

const ROUTE = "/workout_types/";

export async function createWorkoutTypes(
  workoutTypes: WorkoutType[],
): Promise<RequestResult<WorkoutType[]>> {
  // Be aware that there is a bug in this function, probably on the backend side. I haven't dug in enough yet.
  return await newRequestFailure(
    new Error("This function is broken. Don't use it."),
  );
  const result = (await post({
    route: ROUTE,
    body: JSON.stringify(workoutTypes),
  })) as RequestResult<WorkoutType[]>;
  return result;
}

export async function createWorkoutType(
  workoutType: WorkoutType,
): Promise<RequestResult<WorkoutType>> {
  const result = (await post({
    route: ROUTE,
    body: JSON.stringify(workoutType),
  })) as RequestResult<WorkoutType[]>;
  if (!result.success) return result;
  const workoutTypes = result.data;
  if (workoutTypes.length !== 1) {
    return await newRequestFailure(
      new Error("Expected 1 workout type, got " + workoutTypes.length),
    );
  }
  return await newRequestSuccess(workoutTypes[0]);
}
