import { getCurrentUser } from "@/lib/session";
import LoginForm from "./LoginForm";
import AlreadyLoggedInMessage from "./AlreadyLoggedInMessage";
import Logo from "@/components/branding/Logo";

export const metadata = {
  title: "Flex of Gold - Login",
  description: "Login to Flex of Gold",
};

export default async function LoginPage() {
  const user = await getCurrentUser();
  return (
    <main className="flex flex-col items-center justify-start py-8">
      <h1 className="text-3xl lg:text-4xl mt-4 mb-8 lg:mt-8 lg:mb-12 [&>*]:decoration-4 [&>*]:underline-offset-8">
        <Logo />
      </h1>
      {user ? <AlreadyLoggedInMessage /> : <LoginForm />}
    </main>
  );
}
