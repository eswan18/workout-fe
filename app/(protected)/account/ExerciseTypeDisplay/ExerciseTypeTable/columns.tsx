"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import DestructiveConfirmDialogContent from "@/components/dialogs/DestructiveConfirmDialogContent";
import { deleteExerciseType } from "@/lib/resources/exerciseTypes";

export type ExerciseTypeSchema = {
  id: string;
  name: string;
  owner_user_id?: string;
  notes?: string;
};

export const columns: ColumnDef<ExerciseTypeSchema>[] = [
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row, table }) => {
      const deleteExerciseTypeForRow = () => {
        const id = row.original.id;
        if (typeof id !== "string") {
          // This shouldn't happen, but just in case.
          return;
        }
        deleteExerciseType(id).then(
          (result) => {
            if (!result.success) throw result.error;
            table.options.meta?.deleteRowById(id);
          },
          (error) => {
            console.error(error);
          },
        );
      };
      const ownedByUser = row.original.owner_user_id != null;
      return (
        <Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem disabled={!ownedByUser}>
                  Delete
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
          <DestructiveConfirmDialogContent
            titleText={`Confirm Delete ${row.getValue("name") as string}`}
            bodyText="Are you sure you want to delete this exercise type?"
            action={deleteExerciseTypeForRow}
            closeDialog={() => {}}
          />
        </Dialog>
      );
    },
  },
];
