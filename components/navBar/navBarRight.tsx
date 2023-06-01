"use client";

import { signIn, signOut } from 'next-auth/react';

export default async function NavBarRight({ user }: { user: any }) {
  const userEmail = user?.email;
  const logoutButtonForm = (
    user ?
      <NavBarButton onClick={() => signOut({ callbackUrl: "/"})}>Logout</NavBarButton>
    :
      <NavBarButton onClick={signIn}>Sign In</NavBarButton>
  )
  return (
    <div className='flex flex-wrap justify-end lg:gap-2 items-center'>
      <p className='lg:text-sm text-xs overflow-hidden text-ellipsis'>{ userEmail }</p>
      {logoutButtonForm}
    </div>
  )
}

type NavBarButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
}

function NavBarButton({ children, onClick }: NavBarButtonProps) {
  return (
    <div className='flex flex-col justify-center'>
      <button className='px-1 py-0 m-1 lg:m-2 lg:mr-3 text-xs lg:text-sm font-bold border text-gray-50 rounded-sm' onClick={onClick}>
        {children}
      </button>
    </div>
  )
}