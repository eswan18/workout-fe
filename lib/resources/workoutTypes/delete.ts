"use server";

import { del, RequestResult } from "@/lib/requests";

const ROUTE = "/workout_types/";

export async function deleteWorkoutType(
  id: string,
): Promise<RequestResult<void>> {
  const result = (await del({ route: ROUTE, id })) as RequestResult<void>;
  return result;
}
