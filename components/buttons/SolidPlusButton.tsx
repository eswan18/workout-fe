'use client';

type SolidPlusButtonProps = {
  type: 'submit' | 'button' | 'reset';
  onClick?: () => void;
}

export default function SolidPlusButton({type, onClick}: SolidPlusButtonProps) {
  return (
    <button className="flex items-center justify-center text-2xl h-14 w-14 rounded-full font-bold bg-fuchsia-900  text-gray-100" type={type} onClick={onClick}>
      <i className="fa-solid fa-plus text-white"></i>
    </button>
  )
}