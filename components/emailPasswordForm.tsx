import { FormEvent } from 'react';
import Link from 'next/link';

interface EmailPasswordFormProps {
  title: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => any;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  submitText: string;
  altPrompt?: string;
  altButtonText?: string;
  altButtonRef?: string;
}

export default function EmailPasswordForm({ title, onSubmit, setEmail, setPassword, submitText, altPrompt, altButtonText, altButtonRef }: EmailPasswordFormProps) {
  return (
    <div className="flex flex-initial w-100 flex-col text-base items-center justify-center p-2 lg:static rounded-md lg:rounded-xl lg:py-5 lg:px-10 bg-gradient-to-r from-blue-300 to-green-300 dark:from-blue-950 dark:to-green-950 backdrop-blur-md">
      <h2 className="text-2xl font-bold py-3 mt-2">{title}</h2>
      <InnerForm onSubmit={onSubmit} setEmail={setEmail} setPassword={setPassword} submitText={submitText} />
      {
        altPrompt && altButtonText && altButtonRef &&
        <div className='mt-4 text-xs text-center'>
          <p>{altPrompt}</p>
          <Link href={altButtonRef}>
            <button className='text-sm rounded-md font-bold text-gray-50 dark:text-gray-200 border border-gray-200 dark:border-gray-400 w-auto p-2 m-2'>{altButtonText}</button>
          </Link>
        </div>
      }
    </div>
  )
}

interface InnerFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => any;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  submitText: string;
}

function InnerForm({ onSubmit, setEmail, setPassword, submitText }: InnerFormProps) {
  return (
      <form onSubmit={onSubmit} className="flex flex-col gap-3 text-black">
        <div className='flex flex-col gap-1'>
          <label htmlFor="email" className='text-white'>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Email Address'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="password" className='text-white'>Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='text-lg rounded-md font-bold text-gray-50 dark:text-gray-200 border border-gray-200 dark:border-gray-400 w-auto p-1 m-2' type="submit">{submitText}</button>
      </form>
  )
}