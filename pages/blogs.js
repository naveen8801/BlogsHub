import axios from 'axios';
import Head from 'next/head';
import { toast } from 'react-toastify';
import { convertFromRaw, convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

export default function AllBlogs({ blogs }) {
  if (blogs && blogs.length > 0) {
    let ele = blogs[0];
    let data = JSON.parse(ele.content);
    let html = stateToHTML(convertFromRaw(data));
    console.log(html);
  }

  return (
    <div>
      <Head>
        <title>BlogsHub | Blogs</title>
      </Head>
      All Posts comes here
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const res = await axios.get('http://localhost:3001/api/blog');
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
