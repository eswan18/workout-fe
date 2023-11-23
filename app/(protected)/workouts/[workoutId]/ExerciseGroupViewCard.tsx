import { Exercise, ExerciseType } from "@/lib/resources/apiTypes";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dumbbell, X } from "lucide-react";

type ExerciseGroupWidgetProps = {
  exerciseType: ExerciseType;
  exercises: Exercise[];
};

export default async function ExerciseGroupViewCard({
  exerciseType,
  exercises,
}: ExerciseGroupWidgetProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Dumbbell size={36} className="inline mr-2" /> {exerciseType.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row justify-left gap-2 overflow-x-scroll">
        {exercises.map((ex) => (
          <ExerciseViewCard exercise={ex} key={ex.id} />
        ))}
      </CardContent>
    </Card>
  );
}

async function ExerciseViewCard({ exercise }: { exercise: Exercise }) {
  return (
    <Card className="w-20 h-20 flex-shrink-0">
      <CardContent className="h-full flex flex-col justify-center items-center p-0">
        <div className="text-2xl font-bold">{exercise.weight}</div>
        <div className="text-lg">
          <X size={14} className="inline-flex text-muted-foreground mr-0.5" />
          {exercise.reps}
        </div>
      </CardContent>
    </Card>
  );
}
