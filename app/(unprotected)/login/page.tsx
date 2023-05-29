'use client';

import { useGlobalContext } from "@/app/_context/globalContext";
import LoginForm from "@/app/_login/loginForm"

export default async function LoginPage() {
  const { user } = useGlobalContext();
  const loggedIn = !!user;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <div id="a" className="flex flex-col w-full items-center justify-center p-8 dark:from-inherit lg:static lg:rounded-xl lg:p-4 ">
            { loggedIn ? <p>You are already logged in.</p> : <LoginForm /> }
          </div>
        </div>
    </main>
  )   
}