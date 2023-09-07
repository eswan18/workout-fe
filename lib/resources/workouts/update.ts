"use server";

import { patch, RequestResult } from "@/lib/requests";
import { Workout } from "@/lib/resources/apiTypes";

const ROUTE = "/workouts/";

type UpdateWorkoutParams = {
  workoutId: string;
  fields: Partial<Workout>;
};

export async function updateWorkout({
  workoutId,
  fields,
}: UpdateWorkoutParams): Promise<RequestResult<Workout>> {
  return (await patch({
    route: `${ROUTE}`,
    id: workoutId,
    body: JSON.stringify(fields),
  })) as RequestResult<Workout>;
}
