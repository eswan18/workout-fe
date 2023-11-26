import { WorkoutType } from "@/lib/resources/apiTypes";
import { columns } from "./columns";
import { DataTable } from "./DataTable";

export default function WorkoutTypeTable({
  workoutTypes,
}: {
  workoutTypes: WorkoutType[];
}) {
  const wktTpsInSchemaFormat = workoutTypes.map((wktTp) => ({
    ...wktTp,
    id: wktTp.id as string,
  }));
  return <DataTable columns={columns} data={wktTpsInSchemaFormat} />;
}
