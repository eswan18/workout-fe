'use client';

type SolidButtonProps = {
  type: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  enabled?: boolean;
  children?: React.ReactNode;
}

export default function SolidButton({type, onClick, enabled = true, children}: SolidButtonProps) {

  return enabled ? (
      <button className={`rounded-full bg-fuchsia-800 font-bold text-gray-100 py-1 px-3 sm:py-2 sm:px-4 m-2`} type={type} onClick={onClick}>
        {children}
      </button>
  ) : (
      <button className={`rounded-full bg-gray-300 font-bold text-gray-600 py-1 px-3 sm:py-2 sm:px-4 m-2`} type={type} onClick={onClick} disabled={true}>
        {children}
      </button>
  )
}