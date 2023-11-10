"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { Logo } from "@/components/branding/Logo";
import {
  NavigationMenu,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import {
  AlertDialog,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function NavBar() {
  const session = useSession();
  const userEmail = session.data?.user?.email;
  const handleClick = () => {
    userEmail ? signOut({ callbackUrl: "/" }) : signIn();
  };
  const doSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="h-12 w-full flex flex-row justify-between px-1 bg-muted">
      <NavigationMenu>
        {/* Using a Next <Link> tag here actually causes hydration errors. */}
        <NavigationMenuLink
          className={`${navigationMenuTriggerStyle()} bg-transparent`}
          href="/"
        >
          <Logo />
        </NavigationMenuLink>
      </NavigationMenu>
      <div className="flex flex-row justify-right items-center gap-2">
        {userEmail ? (
          <LoggedInStatusDropdown userEmail={userEmail} doSignOut={doSignOut} />
        ) : (
          <Button size="sm" variant="ghost" onClick={handleClick}>
            Sign In
          </Button>
        )}
        <ThemeToggle />
      </div>
    </div>
  );
}

function LoggedInStatusDropdown({
  userEmail,
  doSignOut,
}: {
  userEmail: string;
  doSignOut: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <User size={18} className="mr-1" />
          <p className="overflow-hidden text-ellipsis">{userEmail}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/account">
            <DropdownMenuItem>
              <Settings size={18} className="mr-2 flex flex-row flex-nowrap" />
              <span>Account</span>
            </DropdownMenuItem>
          </Link>
          <LogOutMenuItemAndAlertDialog doSignOut={doSignOut} />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function LogOutMenuItemAndAlertDialog({
  doSignOut,
}: {
  doSignOut?: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          <LogOut size={18} className="mr-2" />
          <span>Log out</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent className="md:w-64">
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out</AlertDialogTitle>
          <AlertDialogDescription>Are you sure?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={doSignOut}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
