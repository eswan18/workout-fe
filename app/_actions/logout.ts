'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

export default async function logout() {
    // This basically clears the existing login cookie.
    cookies().set({'name': 'accessToken', 'value': '', 'maxAge': -1 });
    revalidateTag('currentUser');
}