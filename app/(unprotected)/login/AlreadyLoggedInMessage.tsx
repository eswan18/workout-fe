"use client";

import { signOut } from "next-auth/react";

import Link from "next/link";

export default function AlreadyLoggedInMessage() {
  const initiateSignOut = () => {
    signOut({ callbackUrl: "/" });
  };
  return (
    <>
      <div className="m-3">
        <p>You are already logged in.</p>
      </div>
      <Link href="/dashboard">
        <button
          className="flex flex-row justify-center items-center
                    rounded-full text-white bg-primary
                    py-2 px-4 m-2 gap-2 font-bold"
        >
          <p>Proceed to Dashboard</p>
          <i className="text-lg fi fi-br-arrow-right inline-flex align-[-0.2rem]" />
        </button>
      </Link>
      <button
        className="flex flex-row justify-center items-center
                     rounded-full border-2 border-primary text-primary
                     py-2 px-3 m-2 font-bold text-sm"
        onClick={initiateSignOut}
      >
        Sign Out
      </button>
    </>
  );
}
