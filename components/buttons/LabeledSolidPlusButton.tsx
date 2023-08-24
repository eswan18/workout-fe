'use client';

import SolidPlusButton from "./SolidPlusButton";

type LabeledSolidPlusButtonProps = {
  type: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  label: string;
}

export default function LabeledSolidPlusButton({type, label, onClick}: LabeledSolidPlusButtonProps) {
  return (
    <div className="w-32 max-h-48 flex flex-col items-center p-2">
      <SolidPlusButton type={type} onClick={onClick} />
      <div className="text-fuchsia-900 text-center pt-1 md:pt-2">{label}</div>
    </div>
  )
}