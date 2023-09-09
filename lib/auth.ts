import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import loginUser from "./login";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "eswan" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        if (!credentials?.email || !credentials?.password) {
          console.log("Error: Missing email or password");
          return null;
        }
        const user = await loginUser(credentials.email, credentials.password);
        // I can't figure out how to get the navbar to refresh; this does nothing right now.
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && "token" in user) {
        const access_token = user.token;
        token.accessToken = access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if ("accessToken" in token) {
        // @ts-expect-error Property 'accessToken' does not exist on type 'Session'.
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};
