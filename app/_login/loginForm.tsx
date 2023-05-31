"use client"

import loginUser from '@/app/_actions/login';
import EmailPasswordForm from '@/components/emailPasswordForm';
import { useRouter } from 'next/navigation';


export default function LoginForm({ setUser }: {setUser: (user: string) => void}) {
  console.log("rendering login form")
  const router = useRouter();

  const onSubmit = async ({email, password}: {email: string, password: string}) => {
    console.log("submitting");
    const userEmail = await loginUser(email, password);
    console.log("success", userEmail);
  
    if (userEmail) {
      setUser(email);
      // Wait for 1 second.
      await new Promise(r => setTimeout(r, 1000));
      router.push('/dashboard');
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