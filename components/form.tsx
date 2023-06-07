import Link from 'next/link';
import Button from '@/components/button';

interface EmailPasswordFormProps {
  title: string;
  altPrompt?: string;
  altButtonText?: string;
  altButtonRef?: string;
  action: (data: FormData) => any,
  children: React.ReactNode;
}

export default function Form({ title, altPrompt, altButtonText, altButtonRef, action, children }: EmailPasswordFormProps) {
  return (
    <div className="flex max-w-lg flex-col text-base items-center justify-center p-2 rounded-md border-2 border-gray-700 dark:border-gray-100 shadow-md shadow-neutral-400 dark:shadow-neutral-200">
      <h2 className="text-2xl font-bold py-3 mt-2">{title}</h2>
      <form action={action} className="flex flex-col gap-3 text-black">
        { children }
      </form>
      {
        altPrompt && altButtonText && altButtonRef &&
        <div className='mt-4 text-xs text-center'>
          <p>{altPrompt}</p>
          <Link href={altButtonRef}>
            {/* @ts-expect-error Server Component */}
            <Button type="button">{altButtonText}</Button>
          </Link>
        </div>
      }
    </div>
  )
}