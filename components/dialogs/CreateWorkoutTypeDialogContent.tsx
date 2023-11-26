"use client";

import {
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import LoadingSpinner from "@/components/LoadingSpinner";
import { WorkoutType } from "@/lib/resources/apiTypes";

const formSchema = z.object({
  name: z.string(),
  notes: z.string().optional(),
  parent_workout_type_id: z.string().or(z.undefined()),
});

export default function CreateWorkoutTypeDialogContent({
  closeDialog,
  createWorkoutType,
  workoutTypes,
}: {
  closeDialog: () => void;
  createWorkoutType: (workoutType: WorkoutType) => void;
  workoutTypes: WorkoutType[];
}) {
  return (
    <DialogContent className="flex flex-row justify-center">
      <div className="sm:w-64">
        <DialogHeader>
          <DialogTitle>Create new workout type</DialogTitle>
        </DialogHeader>
        <CreateWorkoutTypeForm
          closeDialog={closeDialog}
          createWorkoutType={createWorkoutType}
          workoutTypes={workoutTypes}
        />
      </div>
    </DialogContent>
  );
}

function CreateWorkoutTypeForm({
  closeDialog,
  createWorkoutType,
  workoutTypes,
}: {
  closeDialog: () => void;
  createWorkoutType: (workoutType: WorkoutType) => void;
  workoutTypes: WorkoutType[];
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const payload: WorkoutType = {
      name: values.name,
      notes: values.notes,
    };
    // We have to use a placeholder string value in the form, so here we check if it's
    // been set and include it in the submission if so.
    if (values.parent_workout_type_id != "null") {
      payload.parent_workout_type_id = values.parent_workout_type_id;
    }
    setLoading(true);
    createWorkoutType(payload);
    setLoading(false);
    closeDialog();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="flex flex-col gap-4 my-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Upper Body" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Other Notes</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parent_workout_type_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Workout Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="" value="null">
                        None
                      </SelectItem>
                      {workoutTypes.map((workoutType) => (
                        <SelectItem
                          key={workoutType.id}
                          value={workoutType.id as string}
                        >
                          {workoutType.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Start</Button>
            </>
          )}
        </DialogFooter>
      </form>
    </Form>
  );
}
