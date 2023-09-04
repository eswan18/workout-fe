import CreateAccountForm from "./CreateAccountForm";
import { getCurrentUser } from "@/lib/session";
import AlreadyLoggedInMessage from "./AlreadyLoggedInMessage";

export const metadata = {
  title: "Flex of Gold - Create Account",
  description: "Create a new account",
};

export default async function CreateAccountPage() {
  const user = await getCurrentUser();
  return (
    <main className="flex flex-col items-center justify-start py-8">
      {user ? <AlreadyLoggedInMessage /> : <CreateAccountForm />}
    </main>
  );
}
