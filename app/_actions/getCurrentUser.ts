'use server';

import { cookies } from 'next/headers';

const apiUrl = process.env.WORKOUT_API_URL;

export default async function getCurrentUser() {
  console.log('getCurrentUser');
  const accessToken = cookies().get('accessToken')?.value ?? null;
  if (!accessToken) {
    return null;
  }

  const response = await fetch(`${apiUrl}/users/me`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ['currentUser'] }
    }).catch((error) => { console.log(error) });
  
  if (!response || !response.ok) {
    console.log(response);
    return null;
  }

  const data = await response.json();
  console.log('getCurrentUser data', data);
  return data?.email ?? null;
}