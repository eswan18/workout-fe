'use client';

import { useGlobalContext } from "@/app/_context/globalContext";
import LoginForm from "@/app/_login/loginForm"
import { useCallback, useEffect, useState } from "react";

export default async function LoginPage() {
  const { state, dispatch } = useGlobalContext();
  const [ loggedIn, setLoggedIn ] = useState(false);
  const setUser = useCallback((user: string) => dispatch({type: 'setUser', payload: user}), [dispatch]);
  console.log("rendering login page")

  useEffect(() => {
    if (!!state.user) {
      setLoggedIn(true);
    }
  }, [state, setLoggedIn]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          <div id="a" className="flex flex-col w-full items-center justify-center p-8 dark:from-inherit lg:static lg:rounded-xl lg:p-4 ">
            { loggedIn ? <p>You are already logged in.</p> : <LoginForm setUser={ setUser } /> }
          </div>
        </div>
    </main>
  )   
}