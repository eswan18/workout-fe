"use client"

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import createUser from '@/app/_actions/createUser';
import EmailPasswordForm from '@/components/emailPasswordForm';
import { signIn } from "next-auth/react"


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
      setIsLoggedIn(true);
      alert("Success! Account created. You're now logged in.")
      router.replace('/dashboard');
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
        altPrompt='Already have an account?'
        altButtonText='Sign In'
        altButtonRef='/dashboard'
      />
  )
}