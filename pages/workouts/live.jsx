import MainLayout from '../../components/mainLayout'
import LiveWorkout from '../../components/workouts/liveWorkout';

export default function LiveWorkoutPage() {
  return (
    <MainLayout>
      <h1>Live Workout</h1>
      <LiveWorkout/>
    </MainLayout>
  );
}