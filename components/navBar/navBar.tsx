import NavBarRight from './navBarRight'
import { getCurrentUser } from '@/lib/session';

export default async function NavBar() {
  const user = await getCurrentUser();
  const userEmail = user?.email as string | undefined;
  return SyncNavBar({ userEmail });
}

function NavBarLeft() {
  return (
    <div className='flex flex-row justify-start items-center'>
      <h1 className='text-sm lg:text-lg px-1 lg:px-3 font-bold'>Ethan&apos;s Workout App</h1>
    </div>
  )
}

// This synchronous version is used for Storybook.
export function SyncNavBar({userEmail}: {userEmail: String | undefined}) {
    return (
      <div className="flex flex-row justify-between bg-gray-50 text-gray-800 border-b-[1px] border-gray-300 dark:border-white h-12 sm:h-14">
        <NavBarLeft />
        <NavBarRight userEmail={userEmail} />
      </div>
    )
}