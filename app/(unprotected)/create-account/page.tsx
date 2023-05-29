'use client';

import { useGlobalContext } from "@/app/_context/globalContext";
import NewAccountForm from "./newAccountForm";

export default async function CreateAccountPage() {
  const { user, setUser } = useGlobalContext();
  const loggedIn = !!user;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <div id="a" className="flex flex-col w-full items-center justify-center p-8 dark:from-inherit lg:static lg:rounded-xl lg:p-4 ">
            { loggedIn ? <p>You are already logged in. Log out first if you wish to create a new user.</p> : <NewAccountForm setUser={ setUser }/> }
            </div>
        </div>
    </main>
  )
}