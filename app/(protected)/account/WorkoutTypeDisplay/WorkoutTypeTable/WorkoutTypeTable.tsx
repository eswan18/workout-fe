import { WorkoutType } from "@/lib/resources/apiTypes";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export default function WorkoutTypeTable({
  workoutTypes,
  setWorkoutTypes,
}: {
  workoutTypes: WorkoutType[];
  setWorkoutTypes: (workoutTypes: WorkoutType[]) => void;
}) {
  return (
    <DataTable
      columns={columns}
      data={workoutTypes}
      setData={setWorkoutTypes}
    />
  );
}
