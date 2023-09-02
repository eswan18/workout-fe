import { Exercise, ExerciseType } from '@/lib/resources/apiTypes';

type ExerciseGroupWidgetProps = {
  exerciseType: ExerciseType;
  exercises: Exercise[];
}

export default async function ExerciseGroupWidget({ exerciseType, exercises }: ExerciseGroupWidgetProps) {
  return (
    <div className="">
      <h2 className="text-xl"><i className="fa-solid fa-dumbbell" /> {exerciseType.name}</h2>
      <div className="flex flex-row justify-left overflow-x-scroll">
      { exercises.map((ex) => <ExerciseWidget exercise={ex} />) }
      </div>
    </div>
  )
}

async function ExerciseWidget({ exercise }: { exercise: Exercise}) {
  return (
    <div className="rounded-lg shadow-lg m-1 py-1 flex flex-col items-center w-20 h-20 bg-white shrink-0">
      <div className="flex flex-col items-center justify-start relative">
        <div className="text-2xl font-bold mt-1">
          {exercise.weight}
        </div>
        <div className="text-xl">
          <i className="fa-solid fa-xmark text-gray-400" /> {exercise.reps}
        </div>
      </div>
    </div>
  )
}