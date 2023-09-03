"use client";

import { signIn, signOut } from 'next-auth/react';

export default function NavBarRight({ userEmail }: { userEmail: String | undefined }) {
  const handleClick = () => {
    userEmail ? signOut({ callbackUrl: "/"}) : signIn();
  }
  const textSize = userEmail ? "text-xs" : "text-sm";
  const buttonText = userEmail ? "Log Out" : "Sign In";
  return (
    <div className={`flex flex-wrap justify-end lg:gap-2 items-center h-full ${textSize}`}>
      <p className='overflow-hidden text-ellipsis'>{ userEmail }</p>
      <button
        className='flex flex-row justify-center items-center
                   rounded-full border-2 border-gold text-gold
                   py-2 px-3 m-2 font-bold'
        onClick={handleClick}
      >
        {buttonText}
      </button>
    </div>
  )
}