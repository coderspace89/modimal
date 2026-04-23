import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
// import Apple from "next-auth/providers/apple"; // Uncomment when ready with .p8 key

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Facebook({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
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
            firstName: user.user.firstName,
            lastName: user.user.lastName,
          };
        }
        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider !== "credentials") {
        try {
          const firstName =
            profile.given_name ||
            profile.first_name ||
            profile.name?.split(" ")[0];
          const lastName =
            profile.family_name ||
            profile.last_name ||
            profile.name?.split(" ").slice(1).join(" ");

          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_LOCAL_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token || account.id_token}`,
          );
          const data = await response.json();

          if (data.jwt) {
            // Update Strapi so the database isn't empty
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

            // Set these on the 'user' object so the jwt() callback below can see them
            user.jwt = data.jwt;
            user.firstName = firstName;
            user.lastName = lastName;
            return true;
          }
          return false;
        } catch (error) {
          console.error("Strapi Social Sync Error:", error);
          return false;
        }
      }
      return true;
    },

    async jwt({ token, user }) {
      // This 'user' object comes from either authorize() or the modified 'user' in signIn()
      if (user) {
        token.accessToken = user.jwt;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      return session;
    },
  },
});
