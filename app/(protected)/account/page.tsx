import { getMe } from "@/lib/resources/users";
import { getAllWorkoutTypes } from "@/lib/resources/workoutTypes/getWorkoutTypes";
import { ExerciseType, WorkoutType } from "@/lib/resources/apiTypes";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllExerciseTypes } from "@/lib/resources/exerciseTypes";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
      <div className="my-12">
        <h1 className="text-4xl">Account</h1>
      </div>
      <div className="flex flex-row justify-start gap-3">
        <span className="text-muted-foreground">Account email:</span>
        <span className="text-foreground">{me.email}</span>
      </div>
      <WorkoutTypeList workoutTypes={workoutTypes} />
      <ExerciseTypeList exerciseTypes={exerciseTypes} />
    </main>
  );
}

function WorkoutTypeList({ workoutTypes }: { workoutTypes: WorkoutType[] }) {
  return (
    <>
      <div className="flex flex-row justify-start items-center gap-2 mt-12 mb-4">
        <h2 className="text-2xl">Workout Types</h2>
        <Button variant="secondary" size="sm" className="ml-2">
          New <Plus size={18} className="ml-1" />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workoutTypes.map((wktTp) => (
            <TableRow key={wktTp.id}>
              <TableCell className="font-medium">{wktTp.name}</TableCell>
              {wktTp.owner_user_id ? (
                <TableCell>You</TableCell>
              ) : (
                <TableCell className="text-muted-foreground">Public</TableCell>
              )}
              <TableCell className="text-muted-foreground">
                {wktTp.notes}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

function ExerciseTypeList({
  exerciseTypes,
}: {
  exerciseTypes: ExerciseType[];
}) {
  return (
    <>
      <div className="flex flex-row justify-start items-center gap-2 mt-12 mb-4">
        <h2 className="text-2xl">Exercise Types</h2>
        <Button variant="secondary" size="sm" className="ml-2">
          New <Plus size={18} className="ml-1" />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exerciseTypes.map((excTp) => (
            <TableRow key={excTp.id}>
              <TableCell className="font-medium">{excTp.name}</TableCell>
              {excTp.owner_user_id ? (
                <TableCell>You</TableCell>
              ) : (
                <TableCell className="text-muted-foreground">Public</TableCell>
              )}
              <TableCell className="text-muted-foreground">
                {excTp.notes}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
