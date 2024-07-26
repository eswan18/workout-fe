'use client';

import { redirect } from "next/navigation";
import useSupabaseClient from "../lib/supabase/client";
import { Provider } from "@supabase/supabase-js";
import Image, { StaticImageData } from "next/image";
import { Card } from "@/components/ui/card";

export default function SignInWithProviderButton({ provider, name, logo }: { provider: Provider, name?: string, logo: StaticImageData }) {

  const supabase = useSupabaseClient();

  const signIn = () => {
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    return redirect("/dashboard");
  }

  const providerName = name || provider;

  return (
    <a onClick={signIn} role="button">
      <Card className="p-2 flex flex-col justify-center items-center gap-2">
        <Image src={logo} alt={providerName} width={30} height={30} />
        <span>{providerName}</span>
      </Card >
    </a>
  );
}