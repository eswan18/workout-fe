import Link from 'next/link';
import { FormEvent } from 'react';

interface EmailPasswordFormProps {
  title: string;
  onSubmit: (event: FormEvent<HTMLFormElement>) => any;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  submitText: string;
  children?: React.ReactNode;
}

export default function EmailPasswordForm({ title, onSubmit, setEmail, setPassword, submitText, children }: EmailPasswordFormProps) {
  return (
    <div className="flex flex-col text-base items-center justify-center p-4 lg:static rounded-md lg:rounded-xl lg:py-10 lg:px-14 bg-gradient-to-r from-blue-300 to-green-300 dark:from-blue-950 dark:to-green-950 backdrop-blur-md">
      <h2 className="text-2xl font-bold p-2">{title}</h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-4 text-black">
        <label htmlFor="email" className='text-white'>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder='Email Address'
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password" className='text-white'>Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='text-lg font-bold text-gray-50 dark:text-gray-200 border border-gray-400 w-auto p-1 m-2' type="submit">{submitText}</button>
      </form>
      { children }
    </div>
  )
}