"use client"

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import EmailPasswordForm from '@/components/emailPasswordForm';
import { signIn } from "next-auth/react"

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const signInResult = await signIn("email", {
      email: email,
      password: password,
    })
    if (!signInResult) {
      alert('Account creation failed. Please try again.');
      return
    }
    if (signInResult.error) {
      alert(signInResult.error);
      return
    }
    if (signInResult.ok) {
      alert("Success! Account created. You're now logged in.")
      router.replace('/dashboard');
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