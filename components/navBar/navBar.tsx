"use client"

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import Logo from "@/components/branding/Logo";
import { NavigationMenu, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react";
import { AlertDialog, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogCancel, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function NavBar() {
  const session = useSession();
  const userEmail = session.data?.user?.email;
  const handleClick = () => {
    userEmail ? signOut({ callbackUrl: "/" }) : signIn();
  };
  const onSignOutClick = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
      <div className="h-12 w-full flex flex-row justify-between bg-background px-2">
        <NavigationMenu>
          <Link href="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Logo />
            </NavigationMenuLink>
          </Link>
        </NavigationMenu>
        <div className="flex flex-row justify-right items-center gap-2">
          { userEmail
            ? <LoggedInStatusDropdown userEmail={userEmail} onSignOutClick={onSignOutClick} />
            : <Button size='sm' onClick={handleClick}>Sign In</Button>
          }
          <ThemeToggle />
        </div>
      </div>
  );
}

function LoggedInStatusDropdown({ userEmail, onSignOutClick}: { userEmail: string, onSignOutClick: () => void}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          <User size={18} className="mr-1" />
          <p className="overflow-hidden text-ellipsis">{userEmail}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <Link href="/account">
            <DropdownMenuItem>
              <Settings size={18} className="mr-2 flex flex-row flex-nowrap" />
              <span>Account</span>
            </DropdownMenuItem>
          </Link>
          <LogOutMenuItemAndAlertDialog />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function LogOutMenuItemAndAlertDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem>
          <LogOut size={18} className="mr-2" /><span>Log out</span>
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign Out</AlertDialogTitle>
          <AlertDialogDescription>Are you sure?</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}