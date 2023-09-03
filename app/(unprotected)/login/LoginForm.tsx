'use client';

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Form from "@/components/forms/Form"
import Input from "@/components/forms/Input"
import Link from "next/link"
import LoadingSpinner from "@/components/LoadingSpinner";


export default function LoginForm() {
  // Pulled largely from this tutorial: https://codevoweb.com/nextjs-use-custom-login-and-signup-pages-for-nextauth-js/
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  // Redirect the user to the dashboard if there's no callback URL.
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const elements = event.currentTarget.elements as HTMLFormControlsCollection & {
      email: { value: string };
      password: { value: string };
    };
    const email = elements.email.value;
    const password = elements.password.value;

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
        // I should come back to this and handle the various possible errors.
        setError("Invalid email or password");
      }
    } catch (error: any) {
      setLoading(false);
      setError(error);
    }
  }

  return (
    <Form title='Log In' onSubmit={handleSubmit}>
      <Input htmlFor='email' type='email' id='email' name='Email' label="Email" placeholder='bobby.tables@gmail.com' />
      <Input htmlFor='password' type='password' id='password' name='Password' label='Password' placeholder='correcthorsebatterystaple' />
      <div className='flex w-full justify-center font-bold'>
        {loading ?
          <LoadingSpinner />
          : 
            <button
              className='flex flex-row justify-center items-center
                        rounded-full text-white bg-gold
                        py-2 px-4 m-2 gap-2'
              type="submit"
            >
              <p>Log In</p>
              <i className="text-lg fi fi-bs-sign-in-alt inline-flex align-[-0.2rem]" />
            </button>
        }
      </div>
      {error && !loading && (
        <p className="text-center bg-red-600 py-4 m-6 rounded-lg text-gray-100">{error}</p>
      )}
      <div className='mt-4 text-sm flex flex-col items-center'>
        <p>Don&apos;t have an account?</p>
        <Link href='/create-account'>
          <button className='flex flex-row justify-center items-center
                      rounded-full border-2 border-gold text-gold
                      py-2 px-3 m-2 font-bold'
          >Create Account</button>
        </Link>
      </div>
    </Form>
  )
}