'use client';

import { redirect } from "next/navigation";
import useSupabaseClient from "../lib/supabase/client";
import { Provider } from "@supabase/supabase-js";

export default function SignInWithProviderButton({ provider, providerName }: { provider: Provider, providerName?: string }) {

  const supabase = useSupabaseClient();

  const signIn = () => {
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    return redirect("/protected");
  }

  providerName = providerName || provider;

  return (
    <div className="flex flex-col w-full justify-center gap-2">
      <a
        onClick={signIn}
        className="bg-foreground rounded-md px-4 py-2 text-background mb-2"
        role="button"
      >
        {`Sign In with ${providerName}`}
      </a>
    </div>
  );
}