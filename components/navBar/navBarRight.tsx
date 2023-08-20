"use client";

import { signIn, signOut } from 'next-auth/react';
import SolidButton from '@/components/buttons/SolidButton';
import GhostButton from '@/components/buttons/GhostButton';

export default function NavBarRight({ userEmail }: { userEmail: String | undefined }) {
  const buttonText = userEmail ? "Log Out" : "Sign In";
  const handleClick = () => {
    userEmail ? signOut({ callbackUrl: "/"}) : signIn();
  }
  const textSize = userEmail ? "text-xs" : "text-sm";
  const Button = userEmail ? GhostButton : SolidButton;
  return (
    <div className={`flex flex-wrap justify-end lg:gap-2 items-center h-full ${textSize}`}>
      <p className='overflow-hidden text-ellipsis'>{ userEmail }</p>
      <Button type='button' onClick={handleClick}>{buttonText}</Button>
    </div>
  )
}