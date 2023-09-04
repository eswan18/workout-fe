"use client";

import { useState } from "react";
import takeCreateUserAction from "./takeCreateUserAction";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Form from "@/components/forms/Form";
import Input from "@/components/forms/Input";
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
        alert("Success! Please sign in now");
        router.push("/api/auth/signin");
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Form title="Create Account" onSubmit={handleSubmit}>
      <Input
        htmlFor="email"
        type="email"
        id="email"
        name="email"
        placeholder="bobby.tables@gmail.com"
        label="Email"
      />
      <Input
        htmlFor="password"
        type="password"
        id="password"
        name="password"
        placeholder="correcthorsebatterystaple"
        label="Password"
      />
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
    </Form>
  );
}
