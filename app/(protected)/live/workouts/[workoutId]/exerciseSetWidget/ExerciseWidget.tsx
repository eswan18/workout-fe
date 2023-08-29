'use client'

import { useState, useEffect } from "react";
import { Exercise } from "@/lib/resources/apiTypes";

type SaveState = "saved" | "saving" | "unsaved"

export async function saveExercise({ exercise, setSaveState }: { exercise: Exercise, setSaveState: (saveState: SaveState) => void }) {
  setSaveState("saving");
  // Todo: actually save the exercise.
  // For now, just sleep 1 second.
  await new Promise((resolve) => setTimeout(resolve, 1000));
  setSaveState("saved");
}

export default function ExerciseWidget({ exercise }: { exercise: Exercise }) {
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const [ex, setEx] = useState<Exercise>(exercise);

  // Do this after the component mounts.
  useEffect(() => {
    saveExercise({ exercise: ex, setSaveState })
  }, [ex]);

  return (
    <div className="rounded-lg p-2 lg:p-4 shadow-lg m-1 lg:m-2 flex flex-col items-center h-24 w-32 bg-white">
      Weight: {ex.weight}, Reps: {ex.reps}
      { /* a little save status indicator */}
      <div className="text-xl font-bold">
        {saveState === "saved" ?
          <i className="fa-regular fa-circle-check" />
          : saveState === "unsaved" ?
            <i className="fa-regular fa-circle opacity-25" />
            :
            <i className="fa-solid fa-spinner animate-spin" />
        }
      </div>
    </div>
  )
}