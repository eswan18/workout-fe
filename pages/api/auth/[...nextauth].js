import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios"
import { inspect } from 'util';

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
            const params = {
                username: credentials.email,
                password: credentials.password,
            }
            const payload = new URLSearchParams(params)
            // We need to pass the url and password as params
            let res
            try {
                res = await axios.post(AUTH_URL, payload, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            } catch (error) {
                console.log('error:')
                console.log(error)
                return null
            }
            const token = res?.data?.access_token
            console.log('access token >>>> ')
            console.log(token)
            if (token) {
                const user = {email: credentials.email, token, accessToken: token}
                console.log('returning from authorize this user:')
                console.log(inspect(user, {showHidden: false, depth: null, colors: true}))
                return user
            } else {
                return null
            }
        }
    }),
  ],
callbacks: {
    async jwt(args) {
        const {token} = args
        console.log('starting jwt()')
        console.log('jwt args')
        console.log(args)
        return token
    },
    async session(args) {
        const { session, token } = args
        console.log('starting session()')
        console.log('session args')
        console.log(args)
        // By default, next-auth removes the token from the session object; add it back
        session.accessToken = token
        return session
      }
},
})