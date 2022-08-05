import axios from 'axios';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import BlogCard from '../components/BlogCard/BlogCard';

export default function AllBlogs({ blogs }) {
  // if (blogs && blogs.length > 0) {
  //   console.log(convertToHtml(blogs[0].content));
  // }
  console.log(blogs);
  if (!blogs) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-section">
      <Head>
        <title>BlogsHub | Blogs</title>
      </Head>
      {blogs &&
        blogs.map((item, i) => (
          <BlogCard
            id={item._id}
            key={i}
            title={item.title}
            created_at={item.created_at}
            author={item.author}
            tags={item.tags}
          />
        ))}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    let url;
    if (process.env.ENV === 'DEV') {
      url = 'http://localhost:3001/api/blog';
    } else {
      url = 'https://blogs-hub-naveen8801.vercel.app/api/blog';
    }
    const res = await axios.get(url);
    if (res.data) {
      return {
        props: {
          blogs: res.data.data,
        },
      };
    }
  } catch (error) {
    toast.error(error.message);
    return {
      props: {
        blogs: [],
      },
    };
  }
}
