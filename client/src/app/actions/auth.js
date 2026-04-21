import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. Send request to Strapi
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_LOCAL_URL}/api/auth/local`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              identifier: credentials?.email,
              password: credentials?.password,
            }),
          },
        );

        const user = await res.json();

        // 2. Return user object if successful, else return null
        if (res.ok && user) {
          return {
            id: user.user.id,
            email: user.user.email,
            jwt: user.jwt, // Store this for API requests
          };
        }
        return null;
      },
    }),
  ],
  secret: process.env.BETTER_AUTH_SECRET,
  callbacks: {
    // 3. Persist the JWT in the session
    async jwt({ token, user }) {
      if (user) token.accessToken = user.jwt;
      // Pass the names into the token
      token.firstName = user.firstName;
      token.lastName = user.lastName;
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      // Make names available in the session object
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      return session;
    },
  },
});
