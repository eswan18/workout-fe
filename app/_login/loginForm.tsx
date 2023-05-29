"use client"

import Link from 'next/link';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import loginUser from '@/app/_actions/login';
import EmailPasswordForm from '@/components/emailPasswordForm';


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
      <EmailPasswordForm
        title='Sign In'
        onSubmit={handleSubmit}
        setEmail={setEmail}
        setPassword={setPassword}
        submitText='Sign In'
      >
        <div className='py-4 text-xs text-center'>
          <p>Don&apos;t have an account?</p>
          <Link className='text-sm pt-5' href="/create-account">Create Account</Link>
        </div>
      </EmailPasswordForm>
  )
}