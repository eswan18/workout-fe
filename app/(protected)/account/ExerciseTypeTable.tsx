import { ExerciseType } from "@/lib/resources/apiTypes";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ExerciseTypeTable({
  exerciseTypes,
}: {
  exerciseTypes: ExerciseType[];
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
