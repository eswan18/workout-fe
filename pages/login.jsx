import MainLayout from '../components/mainLayout';
import LoginForm from '../components/loginForm';

export default function LoginPage() {
  return (
    <MainLayout unprotected>
      <LoginForm/>
    </MainLayout>
  );
}

