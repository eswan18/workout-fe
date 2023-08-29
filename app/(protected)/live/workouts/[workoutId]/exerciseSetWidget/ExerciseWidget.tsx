'use client'

import { useState, useEffect } from "react";
import { Exercise } from "@/lib/resources/apiTypes";
import { createExercise } from "@/lib/resources/exercises/createExercises";


type SaveState = "saved" | "saving" | "unsaved"

export async function saveExercise({ exercise, setSaveState }: { exercise: Exercise, setSaveState: (saveState: SaveState) => void }) {
  setSaveState("saving");
  await createExercise(exercise).then(() => { setSaveState("saved") });
}

export default function ExerciseWidget({ exercise }: { exercise: Exercise }) {
  const [saveState, setSaveState] = useState<SaveState>("saved");
  const [ex, setEx] = useState<Exercise>(exercise);

  // Do this after the component mounts.
  useEffect(() => {
    // This causes a major bug –– exercises get re-saved every time the page loads. Need to figure out how to fix this.
    saveExercise({ exercise: ex, setSaveState })
  }, [ex]);

  return (
    <div className="rounded-lg p-2 lg:p-4 shadow-lg m-1 lg:m-2 flex flex-col items-center w-24 bg-white">
      <div className="flex flex-col items-center">
        <div className="text-2xl font-bold">
          {ex.weight}
        </div>
        <div className="text-xl">
          <i className="fa-solid fa-xmark" /> {ex.reps}
        </div>
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
    </div>
  )
}