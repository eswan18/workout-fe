import { ExerciseType } from "@/lib/resources/apiTypes";
import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

export default function ExerciseTypeTable({
  exerciseTypes,
  setExerciseTypes,
}: {
  exerciseTypes: ExerciseType[];
  setExerciseTypes: (exerciseTypes: ExerciseType[]) => void;
}) {
  return (
    <DataTable
      columns={columns}
      data={exerciseTypes}
      setData={setExerciseTypes}
    />
  );
}
