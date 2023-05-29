"use client"

import loginUser from '@/app/_actions/login';
import EmailPasswordForm from '@/components/emailPasswordForm';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/app/_context/globalContext';


export default function LoginForm() {
  const router = useRouter();

  const onSubmit = async ({email, password}: {email: string, password: string}) => {
    const success = await loginUser(email, password);
    console.log("success", success);
  
    if (success) {
      // Don't directly set the user in the context as this leads to an infinite loop.
      // Just refresh the page.
      router.replace('/dashboard');
    } else {
      alert('Login failed. Please try again.');
    }
  }

  return (
    <EmailPasswordForm
      title='Sign In'
      onSubmit={onSubmit}
      submitText='Sign In'
      altPrompt='Don&apos;t have an account?'
      altButtonText='Create Account'
      altButtonRef='/create-account'
    />
  )
}