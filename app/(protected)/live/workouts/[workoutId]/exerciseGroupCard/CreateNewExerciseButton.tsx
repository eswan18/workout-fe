"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/LoadingSpinner";
import { PlusSquare } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  reps: z.coerce.number().positive().finite().int(),
  weight: z.coerce.number().nonnegative().finite(),
});

export default function CreateNewExerciseButton({
  exerciseTypeName,
  onAddExercise,
}: {
  exerciseTypeName: string;
  onAddExercise: ({ reps, weight }: { reps: number; weight: number }) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* This button has to be inline in this function (not a separate component) for the alert trigger to work */}
        <Button
          className="w-20 h-20 flex flex-col flex-shrink-0 justify-center items-center p-0"
          title="Record new set"
          variant="secondary"
        >
          <PlusSquare size={48} strokeWidth={1.2} className="p-0 m-0" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-row justify-center">
        <div className="sm:w-64">
          <DialogHeader>
            <DialogTitle>{exerciseTypeName}</DialogTitle>
          </DialogHeader>
          <CreateNewExerciseForm
            onAddExercise={onAddExercise}
            closeDialog={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CreateNewExerciseForm({
  onAddExercise,
  closeDialog,
}: {
  onAddExercise: ({ reps, weight }: { reps: number; weight: number }) => void;
  closeDialog: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    onAddExercise(values);
    setLoading(false);
    // Closing the dialog explicitly allows us to close on submit but only if validation succeeds.
    closeDialog();
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} autoComplete="off">
        <div className="flex flex-col gap-4 my-8">
          <FormField
            control={form.control}
            name="reps"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reps</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} />
                </FormControl>
                <FormDescription>Number of reps</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Weight</FormLabel>
                <FormControl>
                  <Input placeholder="0" {...field} />
                </FormControl>
                <FormDescription>Weight in pounds</FormDescription>
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
  );
}
