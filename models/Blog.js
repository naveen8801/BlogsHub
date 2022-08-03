import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const BlogSchema = new Schema({
  title: {
    type: Schema.Types.String,
    required: true,
  },
  tags: [
    {
      type: Schema.Types.String,
    },
  ],
  content: {
    type: Schema.Types.Mixed,
    required: true,
  },
  created_at: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.String,
    required: true,
  },
});

const Blog = mongoose.models.Blogs || mongoose.model('Blogs', BlogSchema);

export default Blog;
