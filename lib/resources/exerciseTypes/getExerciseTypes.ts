"use server";

import {
  get,
  newRequestFailure,
  newRequestSuccess,
  RequestResult,
} from "@/lib/requests";
import { ExerciseType } from "../apiTypes";

const route = "/exercise_types/";

export async function getAllExerciseTypes(): Promise<
  RequestResult<ExerciseType[]>
> {
  const result = (await get({ route })) as RequestResult<ExerciseType[]>;
  return result;
}

export async function getExerciseTypeById(
  id: string,
): Promise<RequestResult<ExerciseType>> {
  const result = (await get({
    route: route,
    params: { id },
  })) as RequestResult<ExerciseType[]>;
  if (!result.success) {
    return result;
  }
  if (result.data.length > 1) {
    return await newRequestFailure(
      new Error(`Multiple exercise types found with id ${id}`),
    );
  }
  const exerciseType = result.data[0];
  return await newRequestSuccess(exerciseType);
}
