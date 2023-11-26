import { getMe } from "@/lib/resources/users";
import { getAllWorkoutTypes } from "@/lib/resources/workoutTypes/getWorkoutTypes";
import { getAllExerciseTypes } from "@/lib/resources/exerciseTypes";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import WorkoutTypeTable from "./WorkoutTypeTable";
import ExerciseTypeTable from "./ExerciseTypeTable";
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
      <div className="flex flex-row justify-start items-center gap-2 mt-14 mb-4">
        <h2 className="text-2xl">Workout Types</h2>
        <Button variant="secondary" size="sm" className="ml-2">
          New <Plus size={18} className="ml-1" />
        </Button>
      </div>
      <WorkoutTypeTable workoutTypes={workoutTypes} />
      <ExerciseTypeDisplay exerciseTypes={exerciseTypes} />
    </main>
  );
}
