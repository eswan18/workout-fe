"use client"

import { useRouter } from 'next/navigation';
import loginUser from '@/app/_actions/login';
import createUser from '@/app/_actions/createUser';
import EmailPasswordForm from '@/components/emailPasswordForm';


export default function NewAccountForm({ setUser }: {setUser: (user: string) => void}) {
  console.log("rendering new account form")
  const router = useRouter();

  const onSubmit = async ({email, password}: {email: string, password: string}) => {
    // First create the user.
    await createUser(email, password);
    // If that succeeds, log them in.
    const userEmail = await loginUser(email, password);

    if (userEmail) {
      setUser(email);
      alert("Success! Account created. You're now logged in.")
      router.push('/dashboard');
    } else {
      alert('Account creation failed. Please try again.');
    }
  }

  return (
      <EmailPasswordForm
        title='Create Account'
        onSubmit={onSubmit}
        submitText='Create Account'
        altPrompt='Already have an account?'
        altButtonText='Sign In'
        altButtonRef='/dashboard'
      />
  )
}