"use client"

import Form from '@/components/form';
import takeCreateUserAction from './takeCreateUserAction';
import { useRouter } from 'next/navigation';
import Button from '@/components/button';


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
      altPrompt='Already have an account?'
      altButtonText='Sign In'
      altButtonRef='/dashboard'
      action={action}
    >
      <div className='flex flex-col gap-1'>
        <label htmlFor='email' className='text-gray-700 dark:text-gray-100'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          placeholder='me@gmail.com'
        />
      </div>
      <div className='flex flex-col gap-1'>
        <label htmlFor='password' className='text-gray-700 dark:text-gray-100'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          placeholder='password'
        />
      </div>
      {/* @ts-expect-error Server Component */}
      <Button type="submit">Submit</Button>
    </Form>
  )
}