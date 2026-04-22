import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
// import Apple from "next-auth/providers/apple"; // Uncomment when ready with .p8 key

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    // 1. Social Providers
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    // 2. Your existing Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
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

        if (res.ok && user) {
          return {
            id: user.user.id,
            email: user.user.email,
            jwt: user.jwt,
            firstName: user.user.firstName, // Make sure to grab these from Strapi response
            lastName: user.user.lastName,
          };
        }
        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    // 3. The Sync logic for Social Logins
    async signIn({ user, account, profile }) {
      // If the user is logging in via Google/Facebook
      if (account.provider !== "credentials") {
        try {
          // Normalize names based on provider
          const firstName =
            profile.given_name ||
            profile.first_name ||
            profile.name?.split(" ")[0];
          const lastName =
            profile.family_name ||
            profile.last_name ||
            profile.name?.split(" ").slice(1).join(" ");
          // Sync with Strapi using the access_token provided by the social platform
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_LOCAL_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token || account.id_token}`,
          );
          const data = await response.json();

          if (!data.jwt) {
            console.log("Strapi rejected login. Response details:", data); // Check your VS Code terminal for this!
          }

          if (data.jwt) {
            // Inside the 'if (data.jwt)' block in your signIn callback:
            await fetch(
              `${process.env.NEXT_PUBLIC_STRAPI_LOCAL_URL}/api/users/${data.user.id}`,
              {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${data.jwt}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName }),
              },
            );
            // Attach the Strapi JWT and names to the user object for the jwt() callback
            user.jwt = data.jwt;
            // Map the names to the user object so they persist in the session
            user.firstName = data.user.firstName || firstName;
            user.lastName = data.user.lastName || lastName;
            return true;
          }
          return false;
        } catch (error) {
          console.error("Strapi Social Sync Error:", error);
          return false;
        }
      }
      return true; // Allow credentials login to proceed
    },

    // 4. Persist data into the JWT
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.jwt;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },

    // 5. Make data available to the Frontend
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      return session;
    },
  },
});
