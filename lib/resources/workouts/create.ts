"use server";

import { Workout } from "../apiTypes";
import { post } from "@/lib/requests";

const route = `/workouts/`;

export async function createWorkout({
  workout,
}: {
  workout: Workout;
}): Promise<Workout> {
  const workouts = (await post({
    route,
    body: JSON.stringify(workout),
  })) as Workout[];
  if (workouts.length > 1) {
    console.log("Warning: more than one workout was created");
  }
  return workouts[0];
}
