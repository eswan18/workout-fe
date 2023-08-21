"use client"

import takeCreateUserAction from './takeCreateUserAction';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SolidButton from '@/components/buttons/SolidButton';
import GhostButton from '@/components/buttons/GhostButton';
import Form from '@/components/forms/Form';
import Input from '@/components/forms/Input';


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
      <Input htmlFor='email' type='email' id='email' name='email' placeholder='bobby.tables@gmail.com' label='Email' />
      <Input htmlFor='password' type='password' id='password' name='password' placeholder='correcthorsebatterystaple' label='Password' />
      <SolidButton type="submit">Submit</SolidButton>
      <div className='mt-4 text-sm text-center'>
        <p>Already have an account?</p>
        <Link href='/login'>
          <GhostButton type="button">Sign In</GhostButton>
        </Link>
      </div>
    </Form>
  )
}