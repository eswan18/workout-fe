import { cookies } from 'next/headers';
import LoginPage from '../_login/page';

export default function ProtectedLayout(props: {
  children: React.ReactNode,
}) {
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get('accessToken');
  const accessToken = tokenCookie?.value

  return accessToken ? props.children : <LoginPage />;
}