import NavBarRight from './navBarRight'
import { getCurrentUser } from '@/lib/session';

export default async function NavBar() {
  const user = await getCurrentUser();
  return (
    <div className="flex flex-row justify-between bg-black text-white border-b-[1px] border-black dark:border-white h-9">
      <NavBarLeft />
      {/* @ts-expect-error Server Component */}
      <NavBarRight user={user} />
    </div>
  )
}

function NavBarLeft() {
  return (
    <div className='flex flex-row justify-start items-center'>
      <h1 className='text-sm lg:text-lg px-1 lg:px-3'>Ethan&apos;s Workout App</h1>
    </div>
  )
}
