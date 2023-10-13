"use client";

import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  // Pulled largely from this tutorial: https://codevoweb.com/nextjs-use-custom-login-and-signup-pages-for-nextauth-js/
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  // Redirect the user to the dashboard if there's no callback URL.
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const { toast } = useToast();
 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const elements = event.currentTarget
      .elements as HTMLFormControlsCollection & {
      email: { value: string };
      password: { value: string };
    };
    const email = elements.email.value;
    const password = elements.password.value;

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email: email,
        password: password,
        callbackUrl,
      });

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        // I should come back to this and handle the various possible errors.
        toast({
          title: "Invalid email or password",
          description: "Please try again.",
        })
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log In</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="bobby.tables@gmail.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="correcthorsebatterystaple"
            />
          </div>
          <div className="w-full flex flex-col items-center">
            {loading ? (
              <LoadingSpinner />
            ) : (
              <Button size='lg' type='submit' className="flex flex-row gap-2">
                <p>Log In</p>
                <i className="fi fi-bs-sign-in-alt inline-flex align-[-0.2rem]" />
              </Button>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-1">
        <p className="text-xs">Don&apos;t have an account?</p>
        <Link href="/create-account">
          <Button size="sm" variant="outline">Create Account</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
