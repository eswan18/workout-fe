import NewWorkoutTypeForm from "./NewWorkoutTypeForm";

export const metadata = {
  title: "New Workout Type",
  description: "Create a new type of workout",
};

export default async function NewWorkoutTypePage() {
  return (
    <main className="flex flex-col items-center justify-start py-8">
      <NewWorkoutTypeForm />
    </main>
  );
}
