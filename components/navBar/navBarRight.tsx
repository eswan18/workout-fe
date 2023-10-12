"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { ThemeToggle } from "./ThemeToggle";

export default function NavBarRight() {
  const session = useSession();
  const userEmail = session.data?.user?.email;
  const handleClick = () => {
    userEmail ? signOut({ callbackUrl: "/" }) : signIn();
  };
  const button = userEmail ? (
    <button
      className="flex flex-row justify-center items-center
                 rounded-full border-gold text-gold
                 py-2 m-2 lg:pr-2 font-bold text-sm"
      onClick={handleClick}
    >
      Log Out
    </button>
  ) : (
    <button
      className="flex flex-row justify-center items-center
                 rounded-full border-2 border-gold text-gold
                 py-1 lg:py-2 px-3 m-2 font-bold text-sm"
      onClick={handleClick}
    >
      Sign In
    </button>
  );
  return (
    <div className="flex flex-wrap justify-end lg:gap-2 items-center h-full text-sm text-gray-800 dark:text-gray-300">
      <i className="text-lg fi fi-rs-circle-user inline-flex align-[-0.25rem]" />
      <p className="overflow-hidden text-ellipsis">{userEmail}</p>
      {button}
      <ThemeToggle />
    </div>
  );
}
