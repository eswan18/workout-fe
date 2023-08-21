'use client';

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, Suspense, useState } from "react";
import GhostButton from "@/components/buttons/GhostButton"
import SolidButton from "@/components/buttons/SolidButton"
import Form from "@/components/forms/Form"
import Input from "@/components/forms/Input"
import Link from "next/link"


export default function NewAccountForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  // Redirect the user to the dashboard if there's no callback URL.
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const form = event.currentTarget;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    try {
      setLoading(true);

      const res = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
        callbackUrl,
      });

      setLoading(false);

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("Invalid email or password");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  }

  return (
    <Form
      title='Log In'
      onSubmit={handleSubmit}
    >
      <Input htmlFor='email' type='email' id='email' name='Email' label="Email" placeholder='bobby.tables@gmail.com'/>
      <Input htmlFor='password' type='password' id='password' name='Password' label='Password' placeholder='correcthorsebatterystaple'/>
      <SolidButton type="submit">Log In</SolidButton>
      {error && !loading && (
        <p className="text-center bg-red-600 py-4 m-6 rounded-lg text-gray-100">{error}</p>
      )}
      <div className='mt-4 text-sm text-center'>
        <p>Don't have an account?</p>
        <Link href='/create-account'>
          <GhostButton type="button">Create Account</GhostButton>
        </Link>
      </div>
    </Form>
  )
}