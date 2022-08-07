import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDB } from '../../../utils/connectionDB';
import User from '../../../models/user';
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
            console.log(res);
            if (!res) {
              //   res.status(404).json({ msg: 'Wrong Credentials' });
              throw new Error('Invalid Credentials !');
            } else {
              return { email: user.email };
            }
          } else {
            // res.status(404).json({ msg: 'No User Found' });
            throw new Error('No use found with this email !');
          }
        }
      },
    }),
  ],
});
