import NextAuth from "next-auth"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    {
        id: 'ethans-workout-api',
        name: "Ethan's Workout API",
        type: 'oauth',
        token: process.env.NEXT_AUTH_URL,
        authorization: {
            url: process.env.NEXTAUTH_URL,
            params: { scope: "email" },
        },
        clientId: 'ethans-workout-app',
      }
    // ...add more providers here
  ],
})