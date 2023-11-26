"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import createUser from "@/app/_actions/createUser";
import { LogIn } from "lucide-react";

const signInForm = z.object({
  email: z.string(),
  password: z.string(),
});

export default function LoginForm() {
  // Pulled largely from this tutorial: https://codevoweb.com/nextjs-use-custom-login-and-signup-pages-for-nextauth-js/
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof signInForm>>({
    resolver: zodResolver(signInForm),
  });
  // Redirect the user to the dashboard if there's no callback URL.
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const handleSubmit = (values: z.infer<typeof signInForm>) => {
    setLoading(true);
    signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl,
    }).then((result) => {
      if (result?.error) {
        toast({
          title: "Sign in failed",
          description: result.error,
        });
        setLoading(false);
        return;
      }
      router.push(callbackUrl);
    });
  };

  return (
    <Card className="sm:w-80">
      <CardHeader>
        <CardTitle>Log In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col gap-4 my-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="bobbytables@school.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="correcthorsebatterystaple"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col items-center">
              {loading ? (
                <LoadingSpinner />
              ) : (
                <Button size="lg" type="submit" className="flex flex-row gap-2">
                  <p>Log In</p>
                  <LogIn size={20} />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-row jusitfy-center">
        <p className="text-xs">Don&apos;t have an account?</p>
        <Link href="/create-account">
          <Button size="sm" variant="link">
            Create Account
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
