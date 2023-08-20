"use client";

import { signIn, signOut } from 'next-auth/react';
import Button from '@/components/button';

export default function NavBarRight({ user }: { user: any }) {
  const userEmail = user?.email;
  const buttonText = user ? "Log out" : "Sign in";
  const handleClick = () => {
    user ? signOut({ callbackUrl: "/"}) : signIn();
  }
  return (
    <div className='flex flex-wrap justify-end lg:gap-2 items-center h-full'>
      <p className='text-xs overflow-hidden text-ellipsis'>{ userEmail }</p>
      <Button type='button' onClick={handleClick} className='text-xs my-auto !text-gray-100 border-white ring-neutral-200 hover:ring-1'>{buttonText}</Button>
    </div>
  )
}