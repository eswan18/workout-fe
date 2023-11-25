"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer } from "lucide-react";
import { formatDurationHMS } from "@/lib/time";
import { WorkoutWithType } from "@/lib/resources/apiTypes";
import { useEffect, useState } from "react";

export default function LiveWorkoutCard({
  workout,
}: {
  workout: WorkoutWithType;
}) {
  const startTime = new Date(workout.start_time);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    // Set up an interval to update the elapsed time every second
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader className="pt-3 pb-2 animate-pulse-2s">
        <CardTitle className="text-lg text-center">
          <Timer size={24} className="pb-1 mr-1 inline" />
          Live
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-row justify-center items-center gap-1 w-auto text-sm p-3 pt-0">
        <div className="flex flex-col px-2 py-1 items-center justify-start">
          <span className="text-muted-foreground">Time Elapsed</span>
          <span className={`text-lg`}>{formatDurationHMS(startTime, now)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
