import { Exercise, ExerciseType } from "@/lib/resources/apiTypes";

type ExerciseGroupWidgetProps = {
  exerciseType: ExerciseType;
  exercises: Exercise[];
};

export default async function ExerciseGroupWidget({
  exerciseType,
  exercises,
}: ExerciseGroupWidgetProps) {
  return (
    <div>
      <h2 className="text-xl">
        <i className="fi fi-ss-gym" /> {exerciseType.name}
      </h2>
      <div className="flex flex-row justify-left gap-2 overflow-x-scroll pb-4 px-1">
        {exercises.map((ex) => (
          <ExerciseWidget exercise={ex} key={ex.id} />
        ))}
      </div>
    </div>
  );
}

async function ExerciseWidget({ exercise }: { exercise: Exercise }) {
  return (
    <div className="rounded-lg shadow-lg flex flex-col items-center justify-center w-20 h-20 bg-white dark:bg-gray-900 shrink-0">
      <div className="text-2xl font-bold mt-1">{exercise.weight}</div>
      <div className="text-xl">
        <i className="fi fi-sr-cross-small inline-flex align-[-0.2rem] text-gray-400" />
        {exercise.reps}
      </div>
    </div>
  );
}
