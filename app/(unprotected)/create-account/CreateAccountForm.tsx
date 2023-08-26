"use client"

import { useState } from "react";
import takeCreateUserAction from './takeCreateUserAction';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import SolidButton from '@/components/buttons/SolidButton';
import GhostButton from '@/components/buttons/GhostButton';
import Form from '@/components/forms/Form';
import Input from '@/components/forms/Input';
import LoadingSpinner from '@/components/LoadingSpinner';


export default function CreateAccountForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const elements = event.currentTarget.elements as HTMLFormControlsCollection & {
      email: { value: string };
      password: { value: string };
    };
    const email = elements.email.value;
    const password = elements.password.value;
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    takeCreateUserAction(data)
      .then(
        (res) => {
          alert("Success! Please sign in now")
          router.push('/api/auth/signin')
        }
      ).catch((err) => { alert(err) })
      .finally(() => { setLoading(false) })
  }

  return (
    <Form
      title='Create Account'
      onSubmit={handleSubmit}
    >
      <Input htmlFor='email' type='email' id='email' name='email' placeholder='bobby.tables@gmail.com' label='Email' />
      <Input htmlFor='password' type='password' id='password' name='password' placeholder='correcthorsebatterystaple' label='Password' />
      <div className='flex w-full justify-center'>
        {loading ?
          <LoadingSpinner />
          : <SolidButton type="submit">Submit</SolidButton>
        }
      </div>
      <div className='mt-4 text-sm text-center'>
        <p>Already have an account?</p>
        <Link href='/login'>
          <GhostButton type="button">Sign In</GhostButton>
        </Link>
      </div>
    </Form>
  )
}