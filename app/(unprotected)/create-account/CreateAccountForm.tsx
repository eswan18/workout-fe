"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
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

const createAccountForm = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(64),
});

export default function CreateAccountForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof createAccountForm>>({
    resolver: zodResolver(createAccountForm),
  });

  const handleSubmit = (values: z.infer<typeof createAccountForm>) => {
    setLoading(true);
    createUser(values)
      .then((result) => {
        if (result instanceof Error) {
          toast({
            title: "Error",
            description: result.message,
          });
          return;
        }
        router.push("/api/auth/signin");
        toast({
          title: "Success! Account created.",
          description: "Please sign in now.",
        });
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: err.message,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card className="sm:w-80">
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
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
                  <p>Create</p>
                  <i className="text-lg fi fi-sr-arrow-circle-right inline-flex align-[-0.2rem]" />
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-row justify-center">
        <p className="text-xs">Already have an account?</p>
        <Link href="/login">
          <Button size="sm" variant="link">
            Log in
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
