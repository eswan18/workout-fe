'use client';

type GhostButtonProps = {
  type: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function GhostButton({type, onClick, children}: GhostButtonProps) {
  return (
      <button className={`rounded-full font-bold text-fuchsia-900 border border-fuchsia-900 py-1 px-3 sm:py-2 sm:px-4 m-2`} type={type} onClick={onClick}>
        {children}
      </button>
  )
}