"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import LoadingSpinner from "@/components/LoadingSpinner";
import { StandaloneExercise } from "@/lib/resources/apiTypes";

const formSchema = z.object({
  weight: z.coerce.number().nonnegative().finite(),
  reps: z.coerce.number().positive().finite().int(),
});

export default function CreateNewExerciseDialogContentForm({
  exerciseTypeName,
  addExercise,
  closeDialog,
}: {
  exerciseTypeName: string;
  addExercise: (exercise: StandaloneExercise) => void;
  closeDialog: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    addExercise({ ...values, start_time: new Date() });
    setLoading(false);
    // Closing the dialog explicitly allows us to close on submit but only if validation succeeds.
    closeDialog();
  };
  return (
    <DialogContent className="flex flex-row justify-center">
      <div className="sm:w-64">
        <DialogHeader>
          <DialogTitle>{exerciseTypeName}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
            <div className="flex flex-col gap-4 my-8">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (pounds)</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="reps"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reps</FormLabel>
                    <FormControl>
                      <Input placeholder="0" {...field} />
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
                  <Button type="submit">Add Set</Button>
                </>
              )}
            </DialogFooter>
          </form>
        </Form>
      </div>
    </DialogContent>
  );
}
