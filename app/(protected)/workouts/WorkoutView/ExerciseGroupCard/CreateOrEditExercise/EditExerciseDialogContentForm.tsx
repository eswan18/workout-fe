"use client";

import * as z from "zod";
import { Exercise, ExerciseWithType } from "@/lib/resources/apiTypes";
import CreateOrEditExerciseDialogContentForm, {
  CreateOrEditExerciseFormSchema,
} from "./CreateOrEditExerciseContentForm";

export default function EditExerciseDialogContentForm({
  exercise,
  updateExercise,
  closeDialog,
}: {
  exercise: ExerciseWithType;
  updateExercise: (exercise: Exercise) => void;
  closeDialog: () => void;
}) {
  const handleSubmit = (
    values: z.infer<typeof CreateOrEditExerciseFormSchema>,
  ) => {
    // todo
    // addExercise({ ...values, start_time: new Date() });
    // Closing the dialog explicitly allows us to close on submit but only if validation succeeds.
    closeDialog();
  };
  return (
    <CreateOrEditExerciseDialogContentForm
      exerciseTypeName={exercise.exercise_type_name}
      onSubmit={handleSubmit}
    />
  );
}
