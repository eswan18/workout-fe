"use server";

import { post } from "@/lib/requests";
import { Exercise } from "@/lib/resources/apiTypes";

const ROUTE = "/exercises/";

export async function createExercises(
  exercises: Exercise[],
): Promise<Exercise[]> {
  return (await post({
    route: ROUTE,
    body: JSON.stringify(exercises),
  })) as Exercise[];
}

export async function createExercise(exercise: Exercise): Promise<Exercise> {
  const exercises = (await post({
    route: ROUTE,
    body: JSON.stringify(exercise),
  })) as Exercise[];
  if (exercises.length !== 1)
    throw new Error("Expected 1 exercise, got " + exercises.length);
  return exercises[0];
}
