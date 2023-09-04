import Link from "next/link";
import NavBarRight from "./navBarRight";
import { getCurrentUser } from "@/lib/session";

export default async function NavBar() {
  const user = await getCurrentUser();
  const userEmail = user?.email as string | undefined;
  return SyncNavBar({ userEmail });
}

function NavBarLeft() {
  return (
    <Link href="/" className="flex flex-row justify-start items-center">
      <h1 className="text-sm lg:text-lg px-2 lg:px-3 font-bold decoration-gold decoration-2 underline underline-offset-4">
        Flex of <span className="text-gold">Gold</span>
      </h1>
    </Link>
  );
}

// This synchronous version is used for Storybook.
export function SyncNavBar({ userEmail }: { userEmail: String | undefined }) {
  return (
    <div className="flex flex-row justify-between bg-gray-50 text-gray-800 border-b-[1px] border-gray-300 dark:border-white h-12 sm:h-14">
      <NavBarLeft />
      <NavBarRight userEmail={userEmail} />
    </div>
  );
}
