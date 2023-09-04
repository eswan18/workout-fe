"use server";

import { patch } from "@/lib/requests";
import { Workout } from "@/lib/resources/apiTypes";

const ROUTE = "/workouts/";

type UpdateWorkoutParams = {
  workoutId: string;
  fields: Partial<Workout>;
};

export async function updateWorkout({
  workoutId,
  fields,
}: UpdateWorkoutParams): Promise<Workout> {
  return (await patch({
    route: `${ROUTE}`,
    id: workoutId,
    body: JSON.stringify(fields),
  })) as Workout;
}
