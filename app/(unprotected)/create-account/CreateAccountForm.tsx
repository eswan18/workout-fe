"use client";

import { useState } from "react";
import takeCreateUserAction from "./takeCreateUserAction";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateAccountForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    takeCreateUserAction(data)
      .then(() => {
        router.push("/api/auth/signin");
        toast.success("Success! Please sign in now");
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
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
                  <p>Create</p>
                  <i className="text-lg fi fi-sr-arrow-circle-right inline-flex align-[-0.2rem]" />
                </Button>
              )}
            </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-1">
          <p className="text-xs">Already have an account?</p>
          <Link href="/login">
            <Button size='sm' variant='outline'>Log in</Button>
          </Link>
      </CardFooter>
    </Card>
  );
}
