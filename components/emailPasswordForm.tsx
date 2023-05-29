'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

interface EmailPasswordFormProps {
  title: string;
  onSubmit: ({ email, password }: { email: string, password: string }) => void;
  submitText: string;
  altPrompt?: string;
  altButtonText?: string;
  altButtonRef?: string;
}

export default function EmailPasswordForm({ title, onSubmit, submitText, altPrompt, altButtonText, altButtonRef }: EmailPasswordFormProps) {

  return (
    <div className="flex flex-initial w-100 flex-col text-base items-center justify-center p-2 lg:static rounded-md lg:rounded-xl lg:py-5 lg:px-10 border-2 border-black dark:border-white shadow-md shadow-neutral-400 dark:shadow-neutral-200">
      <h2 className="text-2xl font-bold py-3 mt-2">{title}</h2>
      <InnerForm onSubmit={onSubmit} submitText={submitText} />
      {
        altPrompt && altButtonText && altButtonRef &&
        <div className='mt-4 text-xs text-center'>
          <p>{altPrompt}</p>
          <a href={altButtonRef}>
            <button className='text-sm rounded-md font-bold text-gray-50 dark:text-gray-200 border border-gray-200 dark:border-gray-400 w-auto p-2 m-2'>{altButtonText}</button>
          </a>
        </div>
      }
    </div>
  )
}

interface InnerFormProps {
  onSubmit: ({ email, password }: { email: string, password: string }) => void;
  submitText: string;
}

function InnerForm({ onSubmit, submitText }: InnerFormProps) {
  'use client';
  // Marking this as "use client" fixed a bug that was incredibly hard to track down –
  // the page would freeze when the input fields were selected.
  console.log('rendering inner form');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({email, password});
  }

  return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-black">
        <div className='flex flex-col gap-1'>
          <label htmlFor="email" className='text-white flex flex-col'>
            Email
            <input
              className='text-black'
              type="email"
              id="email"
              name="email"
              placeholder='Email Address'
              onChange={(e) => {console.log('updating email'); setEmail(e.target.value)}}
              value={email}
            />
          </label>
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="password" className='text-white flex flex-col'>
            <p>Password</p>
            <input
              className='text-black'
              type="password"
              id="password"
              name="password"
              placeholder='Password'
              onChange={(e) => {console.log('updating password'); setPassword(e.target.value)}}
              value={password}
            />
          </label>
        </div>
        <button className='text-lg rounded-md font-bold text-gray-50 dark:text-gray-200 border border-gray-200 dark:border-gray-400 w-auto p-1 m-2' type="submit">{submitText}</button>
      </form>
  )
}