import { getCurrentUser } from '@/lib/session';
import Link from 'next/link';

export default function NavBar() {
  return (
    <div className="flex flex-row justify-between bg-black text-white border-b-[1px] border-black dark:border-white h-9 lg:h-12">
      <div className='flex-auto flex flex-row justify-start items-center'>
        <NavBarLeft />
      </div>
      <div className='flex-auto flex flex-row justify-end items-center'>
        <NavBarRight />
      </div>
    </div>
  )
}

function NavBarLeft() {
  return (
    <div className='text-center text-lg font-bold '>
      <h1 className='text-sm lg:text-lg px-1 lg:px-3'>Ethan&apos;s Workout App</h1>
    </div>
  )
}

async function NavBarRight() {
  const user = await getCurrentUser();
  const userEmail = user?.email;
  console.log("navBar user", userEmail);
  const logout = () => {}
  const logoutButtonForm = (
    user ?
      <form action={logout}>
        <NavBarButton>Logout</NavBarButton>
      </form>
    :
      <NavBarButton>
        <Link href='/dashboard'>Sign In</Link>
      </NavBarButton>
  )
  return (
    <div className='flex flex-wrap justify-end lg:gap-2 items-center'>
      <p className='lg:text-sm text-xs overflow-hidden text-ellipsis'>{ userEmail }</p>
      {logoutButtonForm}
    </div>
  )
}

type NavBarButtonProps = {
  children: React.ReactNode;
}

function NavBarButton({ children }: NavBarButtonProps) {
  return (
    <div className='flex flex-col justify-center'>
      <button className='px-1 py-0 m-1 lg:m-2 lg:mr-3 text-xs lg:text-sm font-bold border text-gray-50 rounded-sm'>
        {children}
      </button>
    </div>
  )
}