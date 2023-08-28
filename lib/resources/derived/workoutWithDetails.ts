'use server'

import { get } from '@/lib/requests';
import { WorkoutWithDetails } from '@/lib/resources/apiTypes';

const ROUTE = '/derived/workout_details/'

export async function getWorkoutWithDetails(id: string): Promise<WorkoutWithDetails> {
  return await get({route: `${ROUTE}${id}`}) as WorkoutWithDetails;
}