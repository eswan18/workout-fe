"use server";

import {
  post,
  RequestResult,
  newRequestSuccess,
  newRequestFailure,
} from "@/lib/requests";
import { fixTypes } from "@/lib/resources/exercises/read";
import { Exercise } from "@/lib/resources/apiTypes";

const ROUTE = "/exercises/";

export async function createExercises(
  exercises: Exercise[],
): Promise<RequestResult<Exercise[]>> {
  const result = (await post({
    route: ROUTE,
    body: JSON.stringify(exercises),
  })) as RequestResult<Exercise[]>;
  return result;
}

export async function createExercise(
  exercise: Exercise,
): Promise<RequestResult<Exercise>> {
  const result = (await post({
    route: ROUTE,
    body: JSON.stringify(exercise),
  })) as RequestResult<Exercise[]>;
  if (result.success === false) {
    return result;
  }
  if (result.data.length !== 1) {
    return await newRequestFailure(
      new Error("Expected 1 exercise, got " + result.data.length),
    );
  }
  const createdExercise = await fixTypes(result.data[0]);
  return await newRequestSuccess(createdExercise);
}
