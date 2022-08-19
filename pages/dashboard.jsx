import { getToken } from 'next-auth/jwt';
import MainLayout from '../components/mainLayout'
import Dashboard from '../components/dashboard'


export default function DashboardPage() {
  return (
    <MainLayout dashboard>
      <h1>Dashboard</h1>
      <Dashboard/>
    </MainLayout>
  );
}
