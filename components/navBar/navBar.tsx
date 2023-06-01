import NavBarRight from './navBarRight'
import { getCurrentUser } from '@/lib/session';

export default async function NavBar() {
  console.log('NavBar is rendering');
  const user = await getCurrentUser();
  return (
    <div className="flex flex-row justify-between bg-black text-white border-b-[1px] border-black dark:border-white h-9 lg:h-12">
      <div className='flex-auto flex flex-row justify-start items-center'>
        <NavBarLeft />
      </div>
      <div className='flex-auto flex flex-row justify-end items-center'>
        {/* @ts-expect-error Server Component */}
        <NavBarRight user={user} />
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
