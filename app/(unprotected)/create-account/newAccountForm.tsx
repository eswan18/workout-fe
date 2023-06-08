"use client"

import Form from '@/components/form';
import takeCreateUserAction from './takeCreateUserAction';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
      action={action}
    >
      <div className="flex flex-col items-center">
        <div className='flex flex-col mb-3'>
          <label htmlFor='email' className='mb-1 text-gray-700 dark:text-gray-100'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='bobby.tables@gmail.com'
            className='dark:text-gray-900'
          />
        </div>
        <div className='flex flex-col mb-3'>
          <label htmlFor='password' className='mb-1 text-gray-700 dark:text-gray-100'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='correcthorsebatterystaple'
            className='dark:text-gray-900'
          />
        </div>
        {/* @ts-expect-error Server Component */}
        <Button type="submit" className='frame-2'>Submit</Button>
        <div className='mt-4 text-xs text-center'>
          <p>Already have an account?</p>
          <Link href='/api/auth/signin'>
            {/* @ts-expect-error Server Component */}
            <Button type="button">Sign In</Button>
          </Link>
        </div>
      </div>
    </Form>
  )
}