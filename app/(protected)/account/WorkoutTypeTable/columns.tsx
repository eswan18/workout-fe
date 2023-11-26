"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export type WorkoutTypeSchema = {
  id: string;
  name: string;
  owner_user_id?: string;
  notes?: string;
};

export const columns: ColumnDef<WorkoutTypeSchema>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0.5"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("name") as string;
      return <span className="font-medium">{value}</span>;
    },
  },
  {
    accessorKey: "owner_user_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0.5"
        >
          Owner
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const value = row.getValue("owner_user_id");
      if (value != null) {
        return <span className="text-foreground">You</span>;
      } else {
        return <span className="text-muted-foreground">Public</span>;
      }
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
  },
];
