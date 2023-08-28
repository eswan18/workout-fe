'use server'

import { get } from '@/lib/requests';
import { Workout } from '@/lib/resources/apiTypes';

export async function getWorkoutById(id: string): Promise<Workout> {
  const workouts = await get({route: `/workouts/`, params: {id}}) as Workout[];
  if (workouts.length > 1) {
    throw new Error(`Multiple workouts found with id ${id}`);
  }
  return workouts[0];
}
