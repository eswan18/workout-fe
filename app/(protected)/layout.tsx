import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function ProtectedLayout(props: {
  children: React.ReactNode,
}) {
  console.log("rendering protected layout");
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get('accessToken');
  const accessToken = tokenCookie?.value

  if (!accessToken) {
    redirect('/login');
  }
  return props.children
}