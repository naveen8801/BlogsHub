import moment from 'moment';
import Blog from '../../../../models/Blog';
import { connectToDB } from '../../../../utils/connectionDB';

export default async function handler(req, res) {
  try {
    const isDb = await connectToDB();
    if (isDb) {
      if (req.method === 'POST') {
        const { title, tags, content, author } = req.body;
        const Newblog = await new Blog({
          title: title,
          tags: tags,
          content: content,
          created_at: moment(),
          author: author || 'Guest',
        }).save();
        res.status(200).json({
          msg: 'Blog Published Successfull',
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
