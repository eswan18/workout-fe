'use server';

import { cookies } from 'next/headers';

const apiUrl = process.env.WORKOUT_API_URL;

export default async function getUser() {
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
      }).catch((error) => { console.log(error) });
    
    if (!response || !response.ok) {
      console.log(response);
      return null;
    }

    const data = await response.json()
    return data?.email ?? null;
}