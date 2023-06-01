import loginUser from "@/app/_actions/login";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
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
        if (!user) {
          return null;
        } else {
          return {"id": user}
        }
      }
    })
  ],
})

export { handler as GET, handler as POST }