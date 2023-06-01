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
  const accessToken = session?.accessToken
  if (!accessToken) {
    throw new Error("No access token found")
  }
  return accessToken
}