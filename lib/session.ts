"use server";

import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

type User = {
  name?: string | null
  email?: string | null
  image?: string | null
}


export async function getCurrentUser(): Promise<User | undefined> {
  const session = await getServerSession(authOptions)

  return session?.user ?? undefined
}

export async function getAccessToken(): Promise<string> {
  const session = await getServerSession(authOptions)
  if (session && 'accessToken' in session) {
    return session.accessToken as string
  }
  throw new Error("No access token found")
}