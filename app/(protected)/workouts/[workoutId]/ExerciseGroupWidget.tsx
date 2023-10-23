import { Card, CardContent } from "@/components/ui/card";
import { Exercise, ExerciseType } from "@/lib/resources/apiTypes";
import { Dumbbell, XIcon } from "lucide-react";

type ExerciseGroupWidgetProps = {
  exerciseType: ExerciseType;
  exercises: Exercise[];
};

export default async function ExerciseGroupWidget({
  exerciseType,
  exercises,
}: ExerciseGroupWidgetProps) {
  return (
    <div className="w-full px-1 flex flex-col justify-start items-start gap-2">
      <h2 className="text-lg font-bold">{exerciseType.name}</h2>
      <div className="flex flex-row justify-left gap-2 overflow-x-scroll pb-4">
        {exercises.map((ex) => (
          <ExerciseWidget exercise={ex} key={ex.id} />
        ))}
      </div>
    </div>
  );
}

async function ExerciseWidget({ exercise }: { exercise: Exercise }) {
  return (
    <Card className="w-20 h-20 shrink-0">
      <CardContent className="flex flex-col items-center justify-center p-2">
        <div className="text-2xl font-bold">{exercise.weight}</div>
        <div className="flex flex-row justify-center items-center">
          <XIcon size={18} strokeWidth={1} className="inline-block"/>
          <span className="text-xl">{exercise.reps}</span>
        </div>
      </CardContent>
    </Card>
  );
}
