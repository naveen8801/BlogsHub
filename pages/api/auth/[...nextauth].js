import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDB } from '../../../utils/connectionDB';
import User from '../../../models/User';
import { VerifyPassowrd } from '../../../utils/auth';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const db = await connectToDB();
        if (db) {
          const user = await User.findOne({
            email: credentials.email,
          });
          if (user) {
            const res = await VerifyPassowrd(
              credentials.password,
              user.password
            );
            if (!res) {
              //   res.status(404).json({ msg: 'Wrong Credentials' });
              throw new Error('Invalid Credentials !');
            } else {
              return user;
            }
          } else {
            // res.status(404).json({ msg: 'No User Found' });
            throw new Error('No use found with this email !');
          }
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user._id;
      }
      return token;
    },
  },
});
