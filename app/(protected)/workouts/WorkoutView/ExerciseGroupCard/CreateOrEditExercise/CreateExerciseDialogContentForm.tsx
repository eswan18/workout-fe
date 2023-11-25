"use client";

import * as z from "zod";
import { StandaloneExercise } from "@/lib/resources/apiTypes";
import CreateOrEditExerciseDialogContentForm, {
  CreateOrEditExerciseFormSchema,
} from "./CreateOrEditExerciseContentForm";

export default function CreateExerciseDialogContentForm({
  exerciseTypeName,
  addExercise,
  closeDialog,
}: {
  exerciseTypeName: string;
  addExercise: (exercise: StandaloneExercise) => void;
  closeDialog: () => void;
}) {
  const handleSubmit = (
    values: z.infer<typeof CreateOrEditExerciseFormSchema>,
  ) => {
    addExercise({ ...values, start_time: new Date() });
    // Closing the dialog explicitly allows us to close on submit but only if validation succeeds.
    closeDialog();
  };
  return (
    <CreateOrEditExerciseDialogContentForm
      exerciseTypeName={exerciseTypeName}
      onSubmit={handleSubmit}
    />
  );
}
