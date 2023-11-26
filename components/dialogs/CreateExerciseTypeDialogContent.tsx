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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import LoadingSpinner from "@/components/LoadingSpinner";
import { ExerciseType } from "@/lib/resources/apiTypes";

const formSchema = z.object({
  name: z.string(),
  numberOfWeights: z.coerce.number().int().nonnegative(),
  notes: z.string().optional(),
});

export default function CreateExerciseTypeDialogContent({
  closeDialog,
  createExerciseType,
}: {
  closeDialog: () => void;
  createExerciseType: (exerciseType: ExerciseType) => void;
}) {
  return (
    <DialogContent className="flex flex-row justify-center">
      <div className="sm:w-64">
        <DialogHeader>
          <DialogTitle>Start a new exercise</DialogTitle>
        </DialogHeader>
        <CreateExerciseTypeForm
          closeDialog={closeDialog}
          createExerciseType={createExerciseType}
        />
      </div>
    </DialogContent>
  );
}

function CreateExerciseTypeForm({
  closeDialog,
  createExerciseType,
}: {
  closeDialog: () => void;
  createExerciseType: (exerciseType: ExerciseType) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    createExerciseType({
      name: values.name,
      number_of_weights: values.numberOfWeights,
      notes: values.notes,
    });
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
                  <Input placeholder="Chest Flys" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="numberOfWeights"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Weights</FormLabel>
                <FormControl>
                  <Input placeholder="1" {...field} />
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
