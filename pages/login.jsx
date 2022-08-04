import MainLayout from '../components/mainLayout';
import LoginForm from '../components/loginForm';

export default function LoginPage() {
  return (
    <MainLayout unprotected>
      <div>
        <h1>Welcome</h1>
        <LoginForm/>
      </div>
    </MainLayout>
  );
}

