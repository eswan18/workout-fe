"use client";

import { ColumnDef } from "@tanstack/react-table"

export type ExerciseTypeSchema = {
  id: string;
  name: string;
  owner_user_id?: string;
  notes?: string;
}

export const columns: ColumnDef<ExerciseTypeSchema>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const value = row.getValue("name") as string;
      return <span className="font-medium">{value}</span>
    }
  },
  {
    accessorKey: "owner_user_id",
    header: "Owner",
    cell: ({ row }) => {
      const value = row.getValue("owner_user_id");
      if (value != null) {
        return <span className="text-foreground">You</span>
      } else {
        return <span className="text-muted-foreground">Public</span>
      }
    }
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
]