import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function ProtectedLayout(props: {
  children: React.ReactNode,
}) {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get('accessToken');
  const accessToken = tokenCookie?.value

  if (!accessToken) {
    redirect('/login');
  }
  return props.children
}