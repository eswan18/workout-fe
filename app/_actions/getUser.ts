import { cookies } from 'next/headers';

export default async function getUser() {
    const accessToken = cookies().get('accessToken')?.value;
    return accessToken ? "somebody!" : null;
}