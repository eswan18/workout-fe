import NewAccountForm from "./newAccountForm";
import { getCurrentUser } from "@/lib/session";

export default async function CreateAccountPage() {
  const user = await getCurrentUser();
  return (
    <main className="flex flex-col items-center justify-start">
      {user ? <p>You are already logged in. Log out first if you wish to create a new user.</p> : <NewAccountForm />}
    </main>
  )
}