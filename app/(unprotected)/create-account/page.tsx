import NewAccountForm from "./newAccountForm";
import { getCurrentUser } from "@/lib/session";

export default async function CreateAccountPage() {
  const user = await getCurrentUser();
  return (
    <main className="flex flex-col items-center justify-between">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div id="a" className="flex flex-col w-full items-center justify-center p-8 dark:from-inherit lg:static lg:rounded-xl lg:p-4 ">
          {user ? <p>You are already logged in. Log out first if you wish to create a new user.</p> : <NewAccountForm />}
        </div>
      </div>
    </main>
  )
}