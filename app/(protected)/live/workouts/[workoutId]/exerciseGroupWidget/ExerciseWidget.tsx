import { SaveStatus } from "@/components/indicators/SaveStatusIndicator";
import SaveStatusOverlayContainer from "./SaveStatusOverlayContainer";

interface ExerciseWidgetProps {
  weight: number;
  reps: number;
  saveStatus: SaveStatus;
  onEditButtonClick: () => void;
}

export default function ExerciseWidget({ weight, reps, saveStatus, onEditButtonClick}: ExerciseWidgetProps) {
  return (
    <div className="py-1 m-1 flex flex-col justify-between items-center w-20 h-[7.5rem] shrink-0">
      <div className="rounded-lg shadow-lg flex flex-col items-center justify-center relative w-full h-20 bg-white shrink-0">
        <SaveStatusOverlayContainer saveStatus={saveStatus} />
        <div className="text-2xl font-bold mt-1">
          {weight}
        </div>
        <div className="text-xl">
          <i className="fi fi-sr-cross-small inline-flex align-[-0.2rem] text-gray-400" />{reps}
        </div>
      </div>
      <EditButtonContainer saveStatus={saveStatus} onClick={onEditButtonClick} />
    </div>
  )
}

type EditButtonContainerProps = {
  saveStatus: SaveStatus;
  onClick: () => void;
}

function EditButtonContainer({saveStatus, onClick}: EditButtonContainerProps) {
  const disabled = !(saveStatus === "saved");
  const color = disabled ? "text-gray-400" : "text-gold";
  return (
    <div className={color}>
      <button disabled={disabled} onClick={onClick}>
        <i className="text-lg fi fi-br-edit" title='Edit exercise'/>
      </button>
    </div>
  )
}
