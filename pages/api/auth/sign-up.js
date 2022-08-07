import { connectToDB } from '../../../utils/connectionDB';
import moment from 'moment';
import User from '../../../models/User';
import { hasPassword } from '../../../utils/auth';

export default async function handler(req, res) {
  try {
    const isDb = await connectToDB();
    if (isDb) {
      if (req.method === 'POST') {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
          res.status(401).json({ msg: 'All fields are required !' });
        } else {
          const userCheck = await User.findOne({ email: email });
          if (!userCheck) {
            const hash = await hasPassword(password);
            const newUser = await new User({
              name: name,
              email: email,
              created_at: moment(),
              password: hash,
              blogs: [],
            }).save();

            res.status(200).json({ msg: 'User Sign Up Successful !' });
          } else {
            res.status(401).json({ msg: 'User already exist with this email' });
          }
        }
      }
    } else {
      res.status(500).json({ msg: 'Database Connecion Error' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
}
