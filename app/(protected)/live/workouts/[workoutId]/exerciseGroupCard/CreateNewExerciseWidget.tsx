"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlusSquare } from "lucide-react";

export default function CreateNewExerciseWidget({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <Card className="w-20 h-20">
      <Button
        className="w-full h-full"
        title="Record new set"
        onClick={onClick}
        variant="secondary"
      >
        <CardContent className="h-full flex flex-col justify-center items-center p-0">
            <PlusSquare size={48} strokeWidth={1.2} className="p-0 m-0" />
        </CardContent>
      </Button>
    </Card>
  );
}
