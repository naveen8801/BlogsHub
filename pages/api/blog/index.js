import { connectToDB } from '../../../utils/connectionDB';

export default async function handler(req, res) {
  try {
    const isDb = await connectToDB();
    if (isDb) {
      res.status(500).json({ msg: 'Database Connecion Successfull' });
    } else {
      res.status(500).json({ msg: 'Database Connecion Error' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Internal Server Error' });
  }
}
