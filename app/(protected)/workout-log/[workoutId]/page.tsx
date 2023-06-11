import WorkoutLog from '../workoutLog'

type WorkoutLogPage = {
  workoutId: string
}

export default async function WorkoutLogPage({ params }: {params: WorkoutLogPage}) {
  const workoutId = params.workoutId
  return (
    <main>
      <WorkoutLog workoutId={workoutId} />
    </main>
  )
}