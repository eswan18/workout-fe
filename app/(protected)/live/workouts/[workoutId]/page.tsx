type PageParams = {
  workoutId: string
}

export default async function WorkoutLogPage({ params }: {params: PageParams}) {
  const workoutId = params.workoutId
  return (
    <main>
      <h1>Workout Log</h1>
      <p>Workout ID: {workoutId} </p>
    </main>
  )
}