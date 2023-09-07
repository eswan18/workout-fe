"use client";

import { useState } from "react";
import takeCreateUserAction from "./takeCreateUserAction";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

export default function CreateAccountForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const elements = event.currentTarget
      .elements as HTMLFormControlsCollection & {
      email: { value: string };
      password: { value: string };
    };
    const email = elements.email.value;
    const password = elements.password.value;
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    takeCreateUserAction(data)
      .then(() => {
        router.push("/api/auth/signin");
        toast.success("Success! Please sign in now");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h1 className="text-2xl font-bold mb-3">Create Account</h1>
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
      <div className="flex w-full justify-center font-bold">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <button
            className="flex flex-row justify-center items-center
                        rounded-full text-white bg-gold
                        py-2 px-4 m-2 gap-2"
            type="submit"
          >
            <p>Create</p>
            <i className="text-lg fi fi-sr-arrow-circle-right inline-flex align-[-0.2rem]" />
          </button>
        )}
      </div>
      <div className="mt-4 text-sm flex flex-col items-center">
        <p>Already have an account?</p>
        <Link href="/login">
          <button
            className="flex flex-row justify-center items-center
                      rounded-full border-2 border-gold text-gold
                      py-2 px-3 m-2 font-bold"
          >
            Log in
          </button>
        </Link>
      </div>
    </form>
  );
}
