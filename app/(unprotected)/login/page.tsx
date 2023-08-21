import { getCurrentUser } from "@/lib/session";
import LoginForm from "./LoginForm";

export default async function LoginPage() {
  const user = await getCurrentUser();
  return <SyncLoginPage user={user} />
}

// This synchronous version is used for Storybook.
export function SyncLoginPage({user}: {user: any}) {
  return (
    <main className="flex flex-col items-center justify-start py-8">
      { user ? <p>nope</p> : <LoginForm /> }
    </main>
  )
}

