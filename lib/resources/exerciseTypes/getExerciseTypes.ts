"use server";

import { get } from "@/lib/requests";
import { ExerciseType } from "../apiTypes";

const route = "/exercise_types/";

export async function getAllExerciseTypes(): Promise<ExerciseType[]> {
  const exerciseTypes = (await get({ route })) as ExerciseType[];
  return exerciseTypes;
}

export async function getWorkoutTypeById(id: string): Promise<ExerciseType> {
  const exerciseTypes = (await get({
    route: route,
    params: { id },
  })) as ExerciseType[];
  if (exerciseTypes.length > 1) {
    throw new Error(`Multiple exercise types found with id ${id}`);
  }
  return exerciseTypes[0];
}
