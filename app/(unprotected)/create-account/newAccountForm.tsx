"use client"

import Form from '@/components/form';
import createAccount from './createAccount';


export default function NewAccountForm() {
  return (
    <Form
      title='Create Account'
      submitText='Create Account'
      altPrompt='Already have an account?'
      altButtonText='Sign In'
      altButtonRef='/dashboard'
      fields={['email', 'password']}
      action={createAccount}
    />
  )
}