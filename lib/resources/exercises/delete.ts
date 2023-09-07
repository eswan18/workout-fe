"use server";

import { del, RequestResult } from "@/lib/requests";

const ROUTE = "/exercises/";

export async function deleteExercise(id: string): Promise<RequestResult<void>> {
  const result = (await del({ route: ROUTE, id })) as RequestResult<void>;
  return result;
}
