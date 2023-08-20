'use client';

type ButtonProps = {
  type: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function Button({type, onClick, children, className}: ButtonProps) {
  return (
      <button className={`rounded-md md:rounded-lg font-bold text-gray-700 dark:text-gray-100 border border-gray-600 dark:border-gray-300 p-1 sm:px-2 m-2 hover:ring-2 ring-neutral-400 ${className}`} type={type} onClick={onClick}>
        {children}
      </button>
  )
}