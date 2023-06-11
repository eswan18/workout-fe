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

export type WorkoutType = {
  id?: string
  name: string
  notes?: string
  parent_workout_type_id?: string
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

export type ExerciseType = {
  id?: string
  owner_user_id?: string
  name: string
  number_of_weights: number
  notes?: string
}