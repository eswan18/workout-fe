'use client';

import SolidPlusButton from "./SolidPlusButton";

type LabeledSolidPlusButtonProps = {
  type: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  label: string;
}

export default function LabeledSolidPlusButton({type, label, onClick}: LabeledSolidPlusButtonProps) {
  return (
    <div className="border border-fuchsia-900 rounded-lg w-32 max-h-48 flex flex-col items-center p-2">
      <SolidPlusButton type={type} onClick={onClick} />
      <div className="text-fuchsia-900 font-bold text-center pt-2 md:pt-4">{label}</div>
    </div>
  )
}