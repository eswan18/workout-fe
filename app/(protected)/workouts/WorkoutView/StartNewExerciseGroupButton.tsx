"use client";

import { Button } from "@/components/ui/button";
import { ExerciseType } from "@/lib/resources/apiTypes";
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
import LoadingSpinner from "@/components/LoadingSpinner";
import { Dumbbell } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import CreateNewExerciseTypeButton from "./CreateNewExerciseTypeButton";

const formSchema = z.object({
  exerciseTypeId: z
    .string({
      required_error: "Please select an exercise.",
    })
    .uuid(),
});

export default function StartNewExerciseGroupButton({
  exerciseTypes,
  onStartNewExerciseGroup,
  addNewExerciseType,
}: {
  exerciseTypes: ExerciseType[];
  onStartNewExerciseGroup: ({
    exerciseTypeId,
  }: {
    exerciseTypeId: string;
  }) => void;
  addNewExerciseType: (exerciseType: ExerciseType) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {/* This button has to be inline in this function (not a separate component) for the alert trigger to work */}
        <Button variant="secondary" className="w-fit">
          <Dumbbell className="mr-2" />
          New exercise
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-row justify-center">
        <div className="sm:w-64">
          <DialogHeader>
            <DialogTitle>Start a new exercise</DialogTitle>
          </DialogHeader>
          <StartNewExerciseGroupForm
            exerciseTypes={exerciseTypes}
            onStartNewExerciseGroup={onStartNewExerciseGroup}
            addNewExerciseType={addNewExerciseType}
            closeDialog={() => setOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function StartNewExerciseGroupForm({
  exerciseTypes,
  onStartNewExerciseGroup,
  addNewExerciseType,
  closeDialog,
}: {
  exerciseTypes: ExerciseType[];
  onStartNewExerciseGroup: ({
    exerciseTypeId,
  }: {
    exerciseTypeId: string;
  }) => void;
  addNewExerciseType: (exerciseType: ExerciseType) => void;
  closeDialog: () => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [loading, setLoading] = useState(false);
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    onStartNewExerciseGroup(values);
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
            name="exerciseTypeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Exercise Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {exerciseTypes.map((exerciseType) => (
                        <SelectItem
                          key={exerciseType.id}
                          value={exerciseType.id as string}
                        >
                          {exerciseType.name}
                        </SelectItem>
                      ))}
                      <Separator />
                      <CreateNewExerciseTypeButton
                        addNewExerciseType={addNewExerciseType}
                      />
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
