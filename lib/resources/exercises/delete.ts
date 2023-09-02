'use server'

import { del } from "@/lib/requests";

const ROUTE = '/exercises/'

export async function deleteExercise(id: string): Promise<void> {
  await del({route: ROUTE, id });
}