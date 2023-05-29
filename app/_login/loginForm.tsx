"use client"

import Link from 'next/link';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import loginUser from '@/app/_actions/login';


export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userEmail = await loginUser(email, password);

    if (userEmail) {
      setIsLoggedIn(true);
      router.refresh();
    } else {
      alert('Login failed. Please try again.');
    }
  }

  return (
    isLoggedIn
    ?
      <div>You&apos;re already logged in! </div>
    :
      <div className="flex flex-col text-base items-center justify-center p-4 lg:static rounded-md lg:rounded-xl lg:py-10 lg:px-14 bg-gradient-to-r light:from-blue-300 light:to-green-300 dark:from-blue-950 dark:to-green-950 backdrop-blur-md">
        <h2 className="text-2xl font-bold p-2">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">
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
        <button className='font-bold text-gray-200 border border-gray-400 w-auto p-1 m-2' type="submit" disabled={ !email || !password } >Log in</button>
        </form>
        <div className='py-4 text-xs text-center'>
          <p>Don't have an account?</p>
          <Link className='text-sm pt-5' href="/create-account">Create Account</Link>
        </div>
      </div>
  )
}