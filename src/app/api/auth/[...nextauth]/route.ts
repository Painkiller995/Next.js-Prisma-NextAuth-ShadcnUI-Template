import { compare } from 'bcrypt';
import prisma from '@@/prisma/client';
import { User } from '@prisma/client';
import { paths } from '@/config/paths';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: paths.login,
    error: paths.login,
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'hello@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // This is no credentials provided
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Look up the user in the database
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Can't find user
        if (!user) {
          return null;
        }

        // Check password
        // Using bcrypt to compare the passwords
        const isPasswordValid = await compare(credentials.password, user.password);

        // Password is invalid
        if (!isPasswordValid) {
          return null;
        }

        // Return the user object
        return {
          id: `${user.id}`,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    // Add user id to session
    // This helps look up the data in the database based on user id
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
      },
    }),
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as User;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
