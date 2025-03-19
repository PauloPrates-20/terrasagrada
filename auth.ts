import NextAuth from 'next-auth';
import Discord from 'next-auth/providers/discord';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Discord({
    authorization: {
      url: "https://discord.com/oauth2/authorize", // must configure base url but the documentation doesn't say it
      params: { scope: 'identify', prompt: 'none' },
    },
  })],
  callbacks: {
    jwt({ token, profile }) {
      if (profile) {
        // console.log('[AUTH][USER]: Logging user info\n', profile);
        token.id = profile.id; // gets the actual discord snowflake id (user's is encrypted for some reason)
        delete token.email; // deletes the email, even though the 'email' scope is not being passed
      }

      return token;
    },
    session({ session, token }) {
      // console.log('[AUTH][USER]: Logging session user info\n' + JSON.stringify(token, null, 2));
      // console.log('[AUTH][SESSION] Logging session information\n', JSON.stringify(session, null, 2));
      session.user.id = String(token.id);
      return session;
    }
  },
  session: {
    maxAge: 60 * 60 * 24
  },
});