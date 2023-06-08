"use client";

import { signIn, signOut } from 'next-auth/react';

export default async function NavBarRight({ user }: { user: any }) {
  const userEmail = user?.email;
  const logoutButtonForm = (
    user ?
      <SignInOutButton onClick={() => signOut({ callbackUrl: "/"})}>Logout</SignInOutButton>
    :
      <SignInOutButton onClick={signIn}>Sign In</SignInOutButton>
  )
  return (
    <div className='flex flex-wrap justify-end lg:gap-2 items-center h-full'>
      <p className='text-xs overflow-hidden text-ellipsis'>{ userEmail }</p>
      {logoutButtonForm}
    </div>
  )
}

type NavBarButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
}

function SignInOutButton({ children, onClick }: NavBarButtonProps) {
  return (
    <button className='px-1 py-0 m-1 text-xs border border-gray-100 text-gray-50 rounded-sm' onClick={onClick}>
      {children}
    </button>
  )
}