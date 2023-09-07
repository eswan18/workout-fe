"use server";

import { put, RequestResult } from "@/lib/requests";
import { Exercise } from "@/lib/resources/apiTypes";

const ROUTE = "/exercises/";

type OverwriteExerciseParams = {
  id: string;
  exercise: Exercise;
};

export async function overwriteExercise({
  id,
  exercise,
}: OverwriteExerciseParams): Promise<RequestResult<Exercise>> {
  const result = (await put({
    route: `${ROUTE}`,
    params: { id },
    body: JSON.stringify(exercise),
  })) as RequestResult<Exercise>;
  return result;
}
