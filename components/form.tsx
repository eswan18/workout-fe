import Link from 'next/link';
import Button from '@/components/button';

interface EmailPasswordFormProps {
  title: string;
  submitText: string;
  altPrompt?: string;
  altButtonText?: string;
  altButtonRef?: string;
  // Fields is an array of strings.
  fields: string[];
  action: (data: FormData) => any,
}

export default function Form({ title, submitText, altPrompt, altButtonText, altButtonRef, fields, action }: EmailPasswordFormProps) {
  return (
    <div className="flex max-w-lg flex-col text-base items-center justify-center p-2 lg:static rounded-md lg:rounded-xl lg:py-5 lg:px-10 border-2 border-black dark:border-white shadow-md shadow-neutral-400 dark:shadow-neutral-200">
      <h2 className="text-2xl font-bold py-3 mt-2">{title}</h2>
      {/* @ts-expect-error Server Component */}
      <InnerForm action={action} submitText={submitText} fields={fields} />
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

interface InnerFormProps {
  action: (data: FormData | undefined) => any,
  submitText: string;
  fields: string[];
}

async function InnerForm({ action, submitText, fields }: InnerFormProps) {
  const fieldDivs = fields.map((field) => {
    return (
      <div className='flex flex-col gap-1' key={field}>
        <label htmlFor={field} className='text-gray-700 dark:text-gray-100'>{field}</label>
        <input
          type={field in ["email", "password"] ? field : "text"}
          id={field}
          name={field}
          placeholder={field}
        />
      </div>
    )
  })
  return (
      <form action={action} className="flex flex-col gap-3 text-black">
        {fieldDivs}
        {/* @ts-expect-error Server Component */}
        <Button type="submit">{submitText}</Button>
      </form>
  )
}