import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;

        if (!email || !password) return null;

        const result = await sql`
          SELECT id, name, email, password
          FROM users
          WHERE email = ${email}
        `;

        const user = result.rows[0];
        if (!user) return null;

        const isValid = await bcrypt.compare(
          password,
          user.password as string
        );
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
});
