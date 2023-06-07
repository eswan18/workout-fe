"use client"

import Form from '@/components/form';
import takeCreateUserAction from './takeCreateUserAction';
import { useRouter } from 'next/navigation';


export default function NewAccountForm() {
  const router = useRouter()

  const action = async (data: FormData) => {
    takeCreateUserAction(data)
    .then(
      (res) => {
        alert("Success! Please sign in now")
        router.push('/api/auth/signin')
      }
    ).catch((err) => {alert(err)})
  }
  return (
    <Form
      title='Create Account'
      submitText='Create Account'
      altPrompt='Already have an account?'
      altButtonText='Sign In'
      altButtonRef='/dashboard'
      fields={['email', 'password']}
      action={action}
    />
  )
}