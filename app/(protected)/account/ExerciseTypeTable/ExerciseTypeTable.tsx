import { ExerciseType } from "@/lib/resources/apiTypes";
import { columns } from "./columns";
import { DataTable } from "./DataTable";

export default function ExerciseTypeTable({
  exerciseTypes,
}: {
  exerciseTypes: ExerciseType[];
}) {
  const exerciseTypesInSchemaFormat = exerciseTypes.map((exerciseType) => ({
    ...exerciseType,
    id: exerciseType.id as string,
  }));
  return <DataTable columns={columns} data={exerciseTypesInSchemaFormat} />;
}
