import { getToken } from 'next-auth/jwt';
import MainLayout from '../components/mainLayout'
import Dashboard from '../components/dashboard'

export async function getServerSideProps({ req }) {
  let token
  try {
    token = await getToken({req})
  } catch(error) {
    console.log('error')
    console.log(error)
  }
  console.log('got token in getServerSideProps')
  console.log(token)
  return { props: { token } }
}

export default function DashboardPage({token}) {
  return (
    <MainLayout dashboard>
      <h1>Dashboard</h1>
      <Dashboard token={token}/>
    </MainLayout>
  );
}
