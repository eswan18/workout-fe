'use server';

import { cookies } from 'next/headers';

const apiUrl = process.env.WORKOUT_API_URL;



export default async function loginUser(email: string, password: string): Promise<string | null> {
  /* Log in a user and get a token from the server */
  if (!email || !password) {
    console.log('Missing email or password');
    return null;
  }

  let formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);
  formData.append('grant_type', 'password');

  const response = await fetch(`${apiUrl}/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    credentials: 'include',
    body: formData.toString(),
  }).catch((error) => { console.log(error) });

  if (!response) {
    return null;
  }
  if (!response.ok) {
    const errorData = await response.json();
    if (response.status === 401) {
      console.log('Invalid credentials');
      return null;
    }
    console.log(errorData.detail);
    return null;
  }
  const data = await response.json();
  const token = data.access_token;
  // decode the posix timestamp into a Date object
  const expiration = new Date(Date.parse(data.expiration_time));
  cookies().set({
    name: 'accessToken',
    value: token,
    httpOnly: true,
    path: '/',
    expires: expiration,
  })
  return email;
}