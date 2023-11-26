import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { WorkoutType } from "@/lib/resources/apiTypes";

export default function WorkoutTypeTable({
  workoutTypes,
}: {
  workoutTypes: WorkoutType[];
}) {
  return (
    <>
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
