"use client"

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import loginUser from '@/app/_actions/login';
import EmailPasswordForm from '@/components/emailPasswordForm';


export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userEmail = await loginUser(email, password);

    if (userEmail) {
      router.refresh();
    } else {
      alert('Login failed. Please try again.');
    }
  }

  return (
    <EmailPasswordForm
      title='Sign In'
      onSubmit={handleSubmit}
      setEmail={setEmail}
      setPassword={setPassword}
      submitText='Sign In'
      altPrompt='Don&apos;t have an account?'
      altButtonText='Create Account'
      altButtonRef='/create-account'
    />
  )
}