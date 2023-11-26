import { UUID } from "crypto";

export type UserIn = {
  email: string;
  password: string;
};

export type UserOut = {
  id: UUID;
  email: string;
};

export type Workout = {
  id?: string;
  user_id?: string;
  start_time?: Date;
  end_time?: Date;
  status: "in-progress" | "paused" | "completed";
  notes?: string;
  // Relations
  workout_type_id?: string;
};

export type WorkoutType = {
  id?: string;
  name: string;
  notes?: string;
  // Relations
  parent_workout_type_id?: UUID | undefined;
  owner_user_id?: UUID | undefined;
};

export type Exercise = {
  id?: string;
  user_id?: string;
  start_time?: Date;
  weight?: number;
  weight_unit?: string;
  reps?: number;
  seconds?: number;
  notes?: string;
  // Relations
  exercise_type_id: string;
  workout_id: string;
};

export type ExerciseType = {
  id?: string;
  owner_user_id?: string;
  name: string;
  number_of_weights?: number;
  notes?: string;
};

////////////////////////////////////////////////////
// Derived types
// These mostly describes payloads that are derived
// from views or otherwise computed dynamically.
////////////////////////////////////////////////////
export type ExerciseWithType = {
  id: string;
  start_time?: Date;
  weight?: number;
  weight_unit?: string;
  reps?: number;
  seconds?: number;
  notes?: string;
  workout_id: string;
  user_id: string;
  exercise_type_id: string;
  exercise_type_name: string;
  number_of_weights?: number;
  exercise_type_notes?: string;
  exercise_type_owner_user_id?: string;
};

export type WorkoutWithType = {
  id: string;
  start_time: Date;
  end_time?: Date;
  status: "in-progress" | "paused" | "completed";
  user_id: string;
  workout_type_id?: string;
  workout_type_name?: string;
  workout_type_notes?: string;
  parent_workout_type_id?: string;
  workout_type_owner_user_id?: string;
};

export type WorkoutWithDetails = {
  workout: WorkoutWithType;
  exercises: ExerciseWithType[];
};

// Simplified types
export type StandaloneExercise = Omit<
  Exercise,
  "exercise_type_id" | "workout_id"
>;
