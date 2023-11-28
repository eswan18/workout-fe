"use server";

import { del, RequestResult } from "@/lib/requests";

const ROUTE = "/exercise_types/";

export async function deleteExerciseType(
  id: string,
): Promise<RequestResult<void>> {
  const result = (await del({ route: ROUTE, id })) as RequestResult<void>;
  return result;
}
