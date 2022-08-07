import Router from 'next/router';
import MainLayout from '../components/mainLayout';

export default function Home() {
  return (
    <MainLayout home unprotected>
      <div>
        <h1>Welcome to my sad workout app</h1>
      </div>
    <button onClick={() => Router.push('/login')}>Go to Your Dashboard</button>
    </MainLayout>
  );
}