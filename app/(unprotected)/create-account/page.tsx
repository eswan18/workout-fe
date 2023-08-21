import NewAccountForm from "./NewAccountForm";
import { getCurrentUser } from "@/lib/session";
import AlreadyLoggedInMessage from "./AlreadyLoggedInMessage";

export default async function CreateAccountPage() {
  const user = await getCurrentUser();
  return <SyncCreateAccountPage user={user} />
}

// This synchronous version is used for Storybook.
export function SyncCreateAccountPage({user}: {user: any}) {
  return (
    <main className="flex flex-col items-center justify-start py-8">
      {user ? <AlreadyLoggedInMessage /> : <NewAccountForm />}
    </main>
  )
}