import Blog from '../../../models/Blog';
import { connectToDB } from '../../../utils/connectionDB';

export default async function handler(req, res) {
  try {
    const isDb = await connectToDB();
    if (isDb) {
      if (req.method === 'GET') {
        const id = req.query.id;
        const blog = await Blog.findById(id);
        res.status(200).json({ msg: '', data: blog });
      }
    } else {
      res.status(500).json({ msg: 'Database Connecion Error' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
}
