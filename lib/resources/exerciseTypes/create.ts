"use server";

import {
  post,
  RequestResult,
  newRequestSuccess,
  newRequestFailure,
} from "@/lib/requests";
import { ExerciseType } from "@/lib/resources/apiTypes";

const ROUTE = "/exercise_types/";

export async function createExerciseTypes(
  exercises: ExerciseType[],
): Promise<RequestResult<ExerciseType[]>> {
  const result = (await post({
    route: ROUTE,
    body: JSON.stringify(exercises),
  })) as RequestResult<ExerciseType[]>;
  return result;
}

export async function createExerciseType(
  exerciseType: ExerciseType,
): Promise<RequestResult<ExerciseType>> {
  const result = (await post({
    route: ROUTE,
    body: JSON.stringify(exerciseType),
  })) as RequestResult<ExerciseType[]>;
  if (result.success === false) {
    return result;
  }
  if (result.data.length !== 1) {
    return await newRequestFailure(
      new Error("Expected 1 exercise, got " + result.data.length),
    );
  }
  const createdExercise = result.data[0];
  return await newRequestSuccess(createdExercise);
}
