import NextAuth, { DefaultSession } from 'next-auth';
import Discord from 'next-auth/providers/discord';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;

    user: {
      id: string;
    } & DefaultSession['user']
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord({
    authorization: {
      url: "https://discord.com/oauth2/authorize", // must configure base url but the documentation doesn't say it
      params: { scope: 'identify', prompt: 'none' },
    },
  })],
  callbacks: {
    jwt({ token, profile, account }) {
      if (profile) {
        token.id = profile.id; // gets the actual discord snowflake id (user's is encrypted for some reason)
        delete token.email; // deletes the email, even though the 'email' scope is not being passed
      }

      if (account?.provider === 'discord') {
        token.accessToken = account.access_token;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = String(token.id);

      if (typeof token.accessToken === 'string') {
        session.accessToken = token.accessToken;
      }

      return session;
    }
  },
  session: {
    maxAge: 60 * 60 * 24
  },
});