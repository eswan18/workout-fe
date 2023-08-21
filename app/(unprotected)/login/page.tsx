import { getCurrentUser } from "@/lib/session";
import LoginForm from "./LoginForm";
import AlreadyLoggedInMessage from "./AlreadyLoggedInMessage";

export default async function LoginPage() {
  const user = await getCurrentUser();
  return (
    <main className="flex flex-col items-center justify-start py-8">
      { user ? <AlreadyLoggedInMessage /> : <LoginForm /> }
    </main>
  )
}
