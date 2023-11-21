"use client";

import { useState, useEffect, useRef } from "react";
import SaveStatusIndicator, {
  SaveStatus,
} from "@/components/indicators/SaveStatusIndicator";

export default function SaveStatusOverlayContainer({
  saveStatus,
}: {
  saveStatus: SaveStatus;
}) {
  const [isSaveStateIndicatorOpaque, setIsSaveStateIndicatorOpaque] =
    useState(false);
  const prevState = useRef<SaveStatus | undefined>(saveStatus);
  const [isFullyHidden, setIsFullyHidden] = useState(true);

  useEffect(() => {
    // Temporarily make the save indicator opaque when the save state changes.
    if (prevState.current != saveStatus) {
      setIsFullyHidden(false);
      setIsSaveStateIndicatorOpaque(true);
      // If we've saved the data, let the indicator fade out after a second.
      if (saveStatus === "saved") {
        setTimeout(() => {
          setIsSaveStateIndicatorOpaque(false);
        }, 1000);
      }
      // As the idicator fades out, set the fully hidden state to true so that the
      // previously-covered objects can respond to clicks.
      setTimeout(() => {
        setIsFullyHidden(true);
      }, 1500);
    }
    // Record the previous state for comparison next time.
    prevState.current = saveStatus;
  }, [saveStatus]);

  const fadeOutClasses = "transition-opacity ease-out duration-00 opacity-0";
  const saveStateIndicatorOpacity = isSaveStateIndicatorOpaque
    ? "opacity-90"
    : fadeOutClasses;
  return (
    <div
      className={`absolute w-full h-full top-0 left-0
      bg-white text-4xl ${saveStateIndicatorOpacity} ${
        isFullyHidden ? "hidden" : null
      }`}
    >
      <div className="flex flex-row justify-center items-center h-full">
        <SaveStatusIndicator saveStatus={saveStatus} />
      </div>
    </div>
  );
}
