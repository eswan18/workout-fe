import CreateAccountForm from "./CreateAccountForm";
import { getCurrentUser } from "@/lib/session";
import AlreadyLoggedInMessage from "./AlreadyLoggedInMessage";

export default async function CreateAccountPage() {
  const user = await getCurrentUser();
  return (
    <main className="flex flex-col items-center justify-start py-8">
      {user ? <AlreadyLoggedInMessage /> : <CreateAccountForm />}
    </main>
  )
}