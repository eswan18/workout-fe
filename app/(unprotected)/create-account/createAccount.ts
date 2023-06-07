'use server';

import createUser from "@/app/_actions/createUser";
import { redirect } from "next/navigation";

export default async function createAccount(data: FormData) {
    const email = data.get('email')
    const password = data.get('password')
    if (!email || !password) {
      console.log("Error: Email or password not provided.")
      return
    }
    if (typeof email !== 'string' || typeof password !== 'string') {
      console.error("Error: Email or password not provided.")
      return
    }
    // First create the user.
    const username = await createUser(email, password)
    if (!username) {
      console.error('Account creation failed. Please try again.');
      return
    }
    // If that succeeds, log them in.
    redirect("api/auth/signin?callbackUrl=/dashboard")
  }