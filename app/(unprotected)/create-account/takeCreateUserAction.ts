'use server';

import createUser from "@/app/_actions/createUser";

export default async function takeCreateUserAction(data: FormData): Promise<string> {
  const email = data.get('email')
  const password = data.get('password')
  if (!email || !password) {
    throw "Error: Email or password not provided."
  }
  if (typeof email !== 'string' || typeof password !== 'string') {
    throw 'Error: Email or password not provided.'
  }
  const username = await createUser(email, password)
  if (!username) {
    throw 'Account creation failed. Please try again.'
  }
  return username
}