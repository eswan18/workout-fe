"use client"

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import loginUser from '@/app/_actions/login';
import createUser from '@/app/_actions/createUser';


export default function NewAccountForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // First create the user.
    await createUser(email, password);
    // If that succeeds, log them in.
    const userEmail = await loginUser(email, password);

    if (userEmail) {
      setIsLoggedIn(true);
      alert("Success! Account created. You're now logged in.")
      router.replace('/protected/dashboard');
    } else {
      alert('Account creation failed. Please try again.');
    }
  }

  return (
    isLoggedIn
    ?
      <div>You&apos;re already logged in! </div>
    :
      <div className="flex flex-col text-base items-center justify-center p-4 lg:static rounded-md lg:rounded-xl lg:py-10 lg:px-14 bg-gradient-to-r light:from-blue-300 light:to-green-300 dark:from-blue-950 dark:to-green-950 backdrop-blur-md">
        <h2 className="text-2xl font-bold p-2">Create Account</h2>
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
        <button className='font-bold text-gray-200 border border-gray-400 w-auto p-1 m-2' type="submit" disabled={ !email || !password } >Create</button>
        </form>
      </div>
  )
}