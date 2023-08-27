import { get } from "@/lib/requests";
import { WorkoutType } from "../apiTypes"

const route = '/workout_types/'

export async function getWorkoutTypes(): Promise<WorkoutType[]> {
  const workoutTypes = await get({route}) as WorkoutType[];
  return workoutTypes;
}