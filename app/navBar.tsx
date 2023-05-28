import logout from '@/app/_actions/logout';
import getUser from './_actions/getUser';
import SubmitButton from '@/components/submitButton';

export default function NavBar() {
  return (
    <div className="grid grid-cols-3 text-center bg-red-400 text-black border-gray-100">
      <NavBarLeft />
      <NavBarCenter />
      {/* @ts-expect-error Server Component */}
      <NavBarRight />
    </div>
  )
}

function NavBarLeft() {
  return <div></div>
}

function NavBarCenter() {
  return (
    <div className='text-center text-lg font-bold p-2'>
      <h1>Ethan&apos;s Workout App</h1>
    </div>
  )
}

async function NavBarRight() {
  const user = await getUser();
  const logoutButtonForm = (
    user ?
      <form action={logout}>
        <SubmitButton className='px-1 py-0 m-2 mr-3'>Logout</SubmitButton>
      </form>
    :
      null
  )
  return (
    <div className='flex justify-end'>
      {logoutButtonForm}
    </div>
  )
}