import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios"

const AUTH_URL = process.env.NEXT_AUTH_URL

export default NextAuth({
  // Configure one or more authentication providers
  site: process.env.NEXTAUTH_URL,
  theme: {
    colorScheme: 'auto', // "auto" | "dark" | "light"
    brandColor: '#abcdef', // Hex color code #33FF5D
  },
  debug: true,
  providers: [
    CredentialsProvider({
        // The name to display on the sign in form (e.g. 'Sign in with...')
        name: "Ethan's Workout API",
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
            email: { label: "Email", type: "text", placeholder: "etc" },
            password: {  label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        console.log(req)
        console.log(AUTH_URL)
        const payload = {
            email: credentials.email,
            password: credentials.password,
        };
        const result = axios.post('http://localhost:8000/v1/token/', {
            username: credentials.username,
            password: credentials.password
        })
        console.log(result)
        console.log("here")

        const res = await fetch('http://localhost:8000/v1/token/', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {"Content-Type": "application/json"},
        })
        const user = await res.json()
        console.log(user)

        // If no error and we have user data, return it
        if (res.ok && user) {
            return user
        }
        // Return null if user data could not be retrieved
        return null
        }
    }),
  ],
callbacks: {
    async jwt({ token, user }) {
        if (user) {
            token.accessToken = user.jwt
        }

        return token
    },
},
})