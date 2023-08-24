import { WorkoutType } from "../apiTypes"
import { getAccessToken } from "@/lib/session";

const apiUrl = process.env.WORKOUT_API_URL;
const endpoint = `${apiUrl}/workout_types/`

export async function getWorkoutTypes(): Promise<WorkoutType[]> {
  const token = await getAccessToken();
  const response = await fetch(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  });
  if (!response.ok) {
    try {
      const error = await response.json()
      throw new Error(error.detail)
    } catch (e) {
      throw new Error("Failed to fetch workout types")
    }
  }
  return await response.json()
}