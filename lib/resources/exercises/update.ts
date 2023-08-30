'use server'

import { put } from "@/lib/requests";
import { Exercise } from "@/lib/resources/apiTypes";

const ROUTE = '/exercises/'

type OverwriteExerciseParams = {
  id: string;
  exercise: Exercise;
}

export async function overwriteExercise({id, exercise}: OverwriteExerciseParams): Promise<Exercise> {
  return await put({route: `${ROUTE}${id}`, body: JSON.stringify(exercise)}) as Exercise;
}