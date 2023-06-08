'use client';

type ButtonProps = {
  type: 'submit' | 'button' | 'reset';
  children: React.ReactNode;
};

export default async function Button({type, children}: ButtonProps) {
  return (
      <button className='rounded-md md:rounded-lg font-bold text-gray-700 dark:text-gray-100 border border-gray-600 dark:border-gray-300 p-1 md:px-2 m-2' type={type}>
        {children}
      </button>
  )
}