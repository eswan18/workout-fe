"use client"

import Link from 'next/link';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import loginUser from '@/app/_actions/login';
import createUser from '@/app/_actions/createUser';
import EmailPasswordForm from '@/components/emailPasswordForm';


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
      router.replace('/dashboard');
    } else {
      alert('Account creation failed. Please try again.');
    }
  }

  return (
    isLoggedIn
    ?
      <div>You&apos;re already logged in! </div>
    :
      <EmailPasswordForm
        title='Create Account'
        onSubmit={handleSubmit}
        setEmail={setEmail}
        setPassword={setPassword}
        submitText='Create Account'
      >
        <div className='py-4 text-xs text-center'>
          <p>Don&apos;t have an account?</p>
          <Link className='text-sm pt-5' href="/create-account">Create Account</Link>
        </div>
      </EmailPasswordForm>
  )
}