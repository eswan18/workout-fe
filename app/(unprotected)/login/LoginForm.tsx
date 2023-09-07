"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function LoginForm() {
  // Pulled largely from this tutorial: https://codevoweb.com/nextjs-use-custom-login-and-signup-pages-for-nextauth-js/
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  // Redirect the user to the dashboard if there's no callback URL.
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const elements = event.currentTarget
      .elements as HTMLFormControlsCollection & {
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
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h1 className="text-2xl font-bold mb-3">Log In</h1>
      <div className="flex flex-col mb-3">
        <label
          htmlFor="email"
          className="mb-1 text-gray-700 dark:text-gray-100 flex flex-col items-start gap-1"
        >
          Email
          <input
            type="email"
            id="email"
            name="email"
            placeholder="bobby.tables@gmail.com"
            className="dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
          />
        </label>
      </div>
      <label
        htmlFor="password"
        className="mb-1 text-gray-700 dark:text-gray-100 flex flex-col items-start gap-1"
      >
        Password
        <input
          type="password"
          id="password"
          name="password"
          placeholder="correcthorsebatterystaple"
          className="dark:text-gray-200 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700"
        />
      </label>
      <div className="flex w-full justify-center font-bold my-2">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <button
            className="flex flex-row justify-center items-center
                        rounded-full text-white bg-gold
                        py-2 px-4 m-2 gap-2"
            type="submit"
          >
            <p>Log In</p>
            <i className="text-lg fi fi-bs-sign-in-alt inline-flex align-[-0.2rem]" />
          </button>
        )}
      </div>
      {error && !loading && (
        <p className="text-center bg-red-600 py-4 m-6 rounded-lg text-gray-100">
          {error}
        </p>
      )}
      <div className="mt-4 text-sm flex flex-col items-center">
        <p>Don&apos;t have an account?</p>
        <Link href="/create-account">
          <button
            className="flex flex-row justify-center items-center
                      rounded-full border-2 border-gold text-gold
                      py-2 px-3 m-2 font-bold"
          >
            Create Account
          </button>
        </Link>
      </div>
    </form>
  );
}
