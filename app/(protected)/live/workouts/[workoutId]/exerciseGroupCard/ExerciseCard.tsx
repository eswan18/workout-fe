import { SaveStatus } from "@/components/indicators/SaveStatusIndicator";
import SaveStatusOverlayContainer from "./SaveStatusOverlayContainer";
import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";

interface ExerciseWidgetProps {
  weight: number;
  reps: number;
  saveStatus: SaveStatus;
}

export default function ExerciseCard({
  weight,
  reps,
  saveStatus,
}: ExerciseWidgetProps) {
  return (
    <Card className="w-20 h-20 flex-shrink-0">
      <CardContent className="h-full flex flex-col justify-center items-center p-0">
        <SaveStatusOverlayContainer saveStatus={saveStatus} />
        <div className="text-2xl font-bold">{weight}</div>
        <div className="text-lg">
          <X size={14} className="inline-flex text-muted-foreground mr-0.5" />
          {reps}
        </div>
      </CardContent>
    </Card>
  );
}
