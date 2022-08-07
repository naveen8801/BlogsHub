import { connectToDB } from '../../utils/connectionDB';
import Blog from '../../models/Blog';

export default async function handler(req, res) {
  try {
    const isDb = await connectToDB();
    if (isDb) {
      if (req.method === 'GET') {
        const blogs = await Blog.find();
        res.status(200).json({ msg: '', data: blogs.reverse() });
      }
    } else {
      res.status(500).json({ msg: 'Database Connecion Error' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
}
