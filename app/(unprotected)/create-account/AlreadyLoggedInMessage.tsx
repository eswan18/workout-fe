'use client';

import { signOut } from 'next-auth/react';

import SolidButton from "@/components/buttons/SolidButton";

export default function AlreadyLoggedInMessage() {
  const handleClick = () => { signOut({ callbackUrl: "/"}) }
  return (
    <>
      <div className="m-3">
        <p>You are already logged in. Log out first if you wish to create a new user.</p>
      </div>
      <SolidButton type='button' onClick={handleClick}>Log Out</SolidButton>
    </>
  )
}