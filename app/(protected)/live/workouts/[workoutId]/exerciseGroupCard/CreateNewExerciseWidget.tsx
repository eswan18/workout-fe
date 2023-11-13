"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "@/components/LoadingSpinner";
import { PlusSquare } from "lucide-react";
import { useState } from "react";

export default function CreateNewExerciseWidget({
  exerciseTypeName,
  onAddExercise,
}: {
  exerciseTypeName: string;
  onAddExercise: ({ reps, weight }: { reps: number; weight: number }) => void;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* This button has to be inline in this function (not a separate component) for the alert trigger to work */}
        <Button
          className="w-20 h-20 flex flex-col justify-center items-center p-0"
          title="Record new set"
          variant="secondary"
        >
          <PlusSquare size={48} strokeWidth={1.2} className="p-0 m-0" />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-row justify-center">
        <CreateNewExerciseForm
          exerciseTypeName={exerciseTypeName}
          onAddExercise={onAddExercise}
        />
      </DialogContent>
    </Dialog>
  );
}

function CreateNewExerciseForm({
  exerciseTypeName,
  onAddExercise,
}: {
  exerciseTypeName: string;
  onAddExercise: ({ reps, weight }: { reps: number; weight: number }) => void;
}) {
  const [loading, setLoading] = useState(false);
  const addGivenExercise = () => {};
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    // reps && weight && onAddExercise({ reps, weight}).then(() => setLoading(false))
  };
  return (
    <div className="sm:w-64">
      <DialogHeader>
        <DialogTitle>{exerciseTypeName}</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4 my-8">
        <div className="flex flex-col gap-2">
          <Label htmlFor="weight">Weight (pounds)</Label>
          <Input type="number" id="weight" name="weight" placeholder="25" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="reps">Reps</Label>
          <Input type="number" id="reps" name="reps" placeholder="8" />
        </div>
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
            <Button onClick={addGivenExercise}>Add Set</Button>
          </>
        )}
      </DialogFooter>
    </div>
  );
}
