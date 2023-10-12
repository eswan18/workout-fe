"use client"

import Link from "next/link";
import NavBarRight from "./navBarRight";
import Logo from "../branding/Logo";
import { NavigationMenu, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle, NavigationMenuViewport } from "@/components/ui/navigation-menu";

export default function NavBar() {
  return (
    <NavigationMenu className="w-full">
      <Link href="/">
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          <Logo />
        </NavigationMenuLink>
      </Link>
      <NavBarRight />
    </NavigationMenu>
  );
}
