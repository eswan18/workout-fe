'use server'

import { post } from "@/lib/requests";
import { Exercise } from "@/lib/resources/apiTypes";

const ROUTE = '/exercises/'

export async function createExercises(exercises: Exercise[]): Promise<Exercise[]> {
  return await post({route: ROUTE, body: JSON.stringify(exercises)}) as Exercise[];
}

export async function createExercise(exercise: Exercise): Promise<Exercise> {
  return await post({route: ROUTE, body: JSON.stringify(exercise)}) as Exercise;
}