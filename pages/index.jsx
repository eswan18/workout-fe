import MainLayout from '../components/mainLayout';
import LoginForm from '../components/loginForm';

export default function Home() {
  const loggedIn = false;
  return (
    loggedIn
    ? <MainLayout home>
      <div>
        <h1>You're In!</h1>
        content goes here
      </div>
    </MainLayout>
    : <MainLayout home>
      <div>
        <h1>Welcome</h1>
        <LoginForm/>
      </div>
    </MainLayout>
  );
}

