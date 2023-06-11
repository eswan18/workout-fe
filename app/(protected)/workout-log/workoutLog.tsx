
interface WorkoutLogProps {
  workoutId: string;
}

export default function WorkoutLog({ workoutId }: WorkoutLogProps) {
  return (
    <div>
      <h1>{ workoutId }</h1>
    </div>
  )
}