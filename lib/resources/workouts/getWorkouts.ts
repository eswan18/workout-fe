'use server'

import { get } from '@/lib/requests';
import { Workout } from '@/lib/resources/apiTypes';

const ROUTE = `/workouts/`;

export async function getWorkoutById(id: string): Promise<Workout> {
  const workouts = await get({route: ROUTE, params: {id}}) as Workout[];
  if (workouts.length > 1) {
    throw new Error(`Multiple workouts found with id ${id}`);
  }
  return workouts[0];
}

export async function getAllWorkouts(): Promise<Workout[]> {
  return await get({route: ROUTE}) as Workout[];
}