import NextAuth from 'next-auth';
import Discord from 'next-auth/providers/discord';

export const { handlers, signIn, signOut, auth } = NextAuth({
    debug: true,
    providers: [Discord({
        authorization: {
            url: "https://discord.com/oauth2/authorize",
            params: { scope: 'identify', prompt: 'none' }
        }
    })],
});