"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { PlusSquare } from "lucide-react";
import { useState } from "react";

export default function CreateNewExerciseWidget({
  exerciseTypeName,
  addExercise,
}: {
  exerciseTypeName: string;
  addExercise: ({ reps, weight }: { reps: number; weight: number }) => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {/* <CreateNewExerciseButtonCard /> */}
        <Button
          className="w-20 h-20 flex flex-col justify-center items-center p-0"
          title="Record new set"
          variant="secondary"
        >
          <PlusSquare size={48} strokeWidth={1.2} className="p-0 m-0" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="md:w-64">
        <CreateNewExerciseForm
          exerciseTypeName={exerciseTypeName}
          addExercise={addExercise}
        />
      </AlertDialogContent>
    </AlertDialog>
  );
}

function CreateNewExerciseForm({
  exerciseTypeName,
  addExercise,
}: {
  exerciseTypeName: string;
  addExercise: ({ reps, weight }: { reps: number; weight: number }) => void;
}) {
  const [reps, setReps] = useState<number | null>(null);
  const [weight, setWeight] = useState<number | null>(null);
  const addGivenExercise = () => {
    reps && weight && addExercise({ reps, weight });
  };
  return (
    <>
      <AlertDialogHeader>
        <AlertDialogTitle>{exerciseTypeName}</AlertDialogTitle>
        <AlertDialogDescription>Are you sure?</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={addGivenExercise}>
          Continue
        </AlertDialogAction>
      </AlertDialogFooter>
    </>
  );
}

/* function CreateNewExerciseButtonCard() {
  return (
  )
} */
