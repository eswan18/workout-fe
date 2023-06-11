export type Workout = {
  id?: string
  user_id?: string
  start_time?: Date
  end_time?: Date
  status: "in-progress" | "paused" | "completed"
  notes?: string
  // Relations
  workout_type_id?: string
}

export type Exercise = {
  id?: string
  user_id?: string
  start_time?: Date
  weight: number
  weight_unit?: 'pounds' | 'kilograms'
  reps?: number
  seconds?: number
  notes?: string
  // Relations
  exercise_type_id: string
  workout_id: string
}