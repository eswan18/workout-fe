import Router from 'next/router';
import MainLayout from '../components/mainLayout';
import LoginForm from '../components/loginForm';

export default function Home() {
  return (
    <MainLayout home unprotected>
      <div>
        <h1>Welcome to my sad workout app</h1>
        content goes here
      </div>
    <button onClick={() => Router.push('/login')}>Login to Your Dashboard</button>
    </MainLayout>
  );
}