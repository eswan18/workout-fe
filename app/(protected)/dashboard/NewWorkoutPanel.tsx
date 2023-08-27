'use client'

import { Workout, WorkoutType } from "@/lib/resources/apiTypes";

import LabeledSolidPlusButton from "@/components/buttons/LabeledSolidPlusButton";
import { createNewWorkout } from "@/lib/resources/workouts/createNewWorkout";

export default function QuickNewWorkoutPanel({ workoutTypes, error }: { workoutTypes: WorkoutType[] | null, error: string | null}) {
  const mainContent = workoutTypes ? workoutTypes.slice(0, 4).map((workoutType, index) => {
    const createAndStartWorkout = () => {
      const workout: Workout = {
        workout_type_id: workoutType.id,
        status: 'in-progress',
        start_time: new Date() // start the workout right now.
      }
      createNewWorkout({workout});
    }
    return <LabeledSolidPlusButton type="button" label={workoutType.name} key={index} onClick={createAndStartWorkout} />
  }) : <p>{error}</p>
  return (
    <div className="border border-fuchsia-900 rounded-lg p-2 lg:p-4 shadow-lg bg-fuchsia-50">
      { workoutTypes && <h2 className="text-gray-900 text-lg lg:text-2xl">New Workout by Type</h2> }
      <div className="flex flex-row flex-wrap mt-2 justify-between after:flex-1">
        { mainContent }
      </div>
    </div>
  )
}