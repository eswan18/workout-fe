import { getMe } from "@/lib/resources/users";
import { getAllWorkoutTypes } from "@/lib/resources/workoutTypes/getWorkoutTypes";
import { getAllExerciseTypes } from "@/lib/resources/exerciseTypes";
import WorkoutTypeDisplay from "./WorkoutTypeDisplay";
import ExerciseTypeDisplay from "./ExerciseTypeDisplay";

export default async function AccountPage() {
  const meResult = await getMe();
  if (!meResult.success) throw meResult.error;
  const me = meResult.data;

  const wktTpsResult = await getAllWorkoutTypes();
  if (!wktTpsResult.success) throw wktTpsResult.error;
  const workoutTypes = wktTpsResult.data;

  const excTpsResult = await getAllExerciseTypes();
  if (!excTpsResult.success) throw excTpsResult.error;
  const exerciseTypes = excTpsResult.data;

  return (
    <main className="flex flex-col justify-start p-10 lg:p-16">
      <h1 className="text-4xl">Account</h1>
      <div className="flex flex-row justify-start gap-3 mt-8">
        <span className="text-muted-foreground">Account email:</span>
        <span className="text-foreground">{me.email}</span>
      </div>
      <WorkoutTypeDisplay workoutTypes={workoutTypes} />
      <ExerciseTypeDisplay exerciseTypes={exerciseTypes} />
    </main>
  );
}
