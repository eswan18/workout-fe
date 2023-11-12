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
      <CardContent className="h-full flex flex-col justify-center items-center p-0">
        <Button
          className="text-gold p-0"
          title="Record new set"
          onClick={onClick}
          variant="ghost"
        >
          <PlusSquare size={48} strokeWidth={1.5} />
        </Button>
      </CardContent>
    </Card>
  );
}
