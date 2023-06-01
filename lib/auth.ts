import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import loginUser from "./login";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        username: { label: "Email", type: "text", placeholder: "eswan" },
        password: {  label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) {
          console.log('Missing email or password');
          return null;
        }
        const user = await loginUser(credentials.username, credentials.password);
        return user
      }
    })
  ],
}