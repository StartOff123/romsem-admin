import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
// @ts-ignore
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { db } from '@/lib/db';

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db),
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				login: { label: 'login', type: 'text' },
				password: { label: 'password', type: 'password' }
			},
			async authorize(credentials) {
				if (!credentials?.login || !credentials?.password) {
					throw new Error('Invalid Credentials');
				}

				const user = await db.user.findUnique({
					where: { login: credentials.login }
				});

				if (!user || !user?.passwordHash) {
					throw new Error('Invalid Credentials');
				}

				const isCorrectPassword = await bcrypt.compare(
					credentials.password,
					user.passwordHash
				);

				if (!isCorrectPassword) {
					throw new Error('Invalid Credentials');
				}

				return user;
			}
		})
	],
	callbacks: {
		async jwt({
			token,
			account,
			profile
		}: {
			token: any;
			account: any;
			profile: any;
		}) {
			if (account && profile) {
				token.sub = profile.sub;
			}
			return token;
		},
		async session({ session, token }: { session: any; token: any }) {
			if (session.user) {
				session.user.id = token.sub;
			}

			return session;
		}
	},
	debug: process.env.NODE_ENV === 'development',
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET
};
