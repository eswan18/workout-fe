"use server";

import { getServerSession } from "next-auth/next"

import { authOptions } from "@/lib/auth"

export async function getCurrentUser() {
  const session = await getServerSession(authOptions)
  console.log(">>> getCurrentUser")
  console.dir(session)

  return session?.user
}