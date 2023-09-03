'use client';

import { signOut } from 'next-auth/react';

export default function AlreadyLoggedInMessage() {
  const initiateSignOut = () => { signOut({ callbackUrl: "/"}) }
  return (
    <>
      <div className="m-3">
        <p>You are already logged in. Log out first if you wish to create a new user.</p>
      </div>
      <button
        className='flex flex-row justify-center items-center
                    rounded-full border-2 border-gold text-gold
                    py-2 px-3 m-2 font-bold text-sm'
        onClick={initiateSignOut}
      >Sign Out</button>
    </>
  )
}