import { connectToDB } from '../../utils/connectionDB';
import moment from 'moment';
import ContactUsDB from '../../models/Contact';

export default async function handler(req, res) {
  try {
    const isDb = await connectToDB();
    if (isDb) {
      if (req.method === 'POST') {
        const { email, query } = req.body;
        const NewEntry = await new ContactUsDB({
          email: email,
          query: query,
          created_at: moment(),
        }).save();
        res.status(200).json({
          msg: 'Your query has been sent successfully !',
        });
      }
    } else {
      res.status(500).json({ msg: 'Database Connecion Error' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
}
