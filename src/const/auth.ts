import {MongoDBAdapter as mongoDBAdapter} from '@next-auth/mongodb-adapter';
import {AuthOptions} from 'next-auth';
import googleProvider from 'next-auth/providers/google';

import mongoPromise from '@/lib/mongodb';


const cookieDomain = process.env.NEXTAUTH_COOKIE_DOMAIN;

if (!cookieDomain) {
  throw new Error('Invalid/missing environment variable `NEXTAUTH_COOKIE_DOMAIN`.');
}

const useSecureCookies = cookieDomain.startsWith('https://');
const cookiePrefix = useSecureCookies ? '__Secure-' : '';
const hostName = new URL(cookieDomain).hostname;

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: mongoDBAdapter(
    mongoPromise,
    {databaseName: 'auth'},
  ),
  providers: [
    googleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        domain: '.' + hostName,
        secure: useSecureCookies,
      },
    },
  },
};
