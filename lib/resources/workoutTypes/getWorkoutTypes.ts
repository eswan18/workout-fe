'use server'

import { get } from "@/lib/requests";
import { WorkoutType } from "../apiTypes"

const route = '/workout_types/'

export async function getAllWorkoutTypes(): Promise<WorkoutType[]> {
  const workoutTypes = await get({route}) as WorkoutType[];
  return workoutTypes;
}

export async function getWorkoutTypeById(id: string): Promise<WorkoutType> {
  const workoutTypes = await get({route: route, params: {id}}) as WorkoutType[];
  if (workoutTypes.length > 1) {
    throw new Error(`Multiple workout types found with id ${id}`);
  }
  return workoutTypes[0];
}