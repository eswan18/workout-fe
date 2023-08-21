'use client';

import { signOut } from 'next-auth/react';

import SolidButton from "@/components/buttons/SolidButton";
import GhostButton from '@/components/buttons/GhostButton';
import Link from 'next/link';

export default function AlreadyLoggedInMessage() {
  const initiateSignOut = () => { signOut({ callbackUrl: "/"}) }
  return (
    <>
      <div className="m-3">
        <p>You are already logged in.</p>
      </div>
      <Link href="/dashboard"><SolidButton type='button'>Proceed to your dashboard</SolidButton></Link>
      <GhostButton type='button' onClick={initiateSignOut}>Log Out</GhostButton>
    </>
  )
}