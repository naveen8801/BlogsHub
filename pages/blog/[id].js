import { useRouter } from 'next/router';
import axios from 'axios';
import Head from 'next/head';
import { Card, Typography } from '@material-ui/core';
import moment from 'moment';
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { EditorState, convertToRaw } from 'draft-js';
import dynamic from 'next/dynamic';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

export default function Blog({ blog }) {
  const { created_at, author, title, tags, content } = blog;

  const convert = (raw) => {
    return convertFromRaw(JSON.parse(raw));
  };

  const contentState = convert(content);
  const editorState = EditorState.createWithContent(contentState);

  const router = useRouter();
  return (
    <div className="single-blog-section">
      <Head>
        <title>BlogsHub | Blog</title>
      </Head>
      <div className="header">
        <Typography className="info" variant="h7">
          By {' ' + author}
        </Typography>
        <Typography className="title" variant="h5">
          {title}
        </Typography>
        <Typography className="info" variant="h7">
          {moment(created_at).fromNow()}
        </Typography>
      </div>
      <div className="content" id="content">
        <Editor
          editorState={editorState}
          readOnly={true}
          toolbarHidden={true}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  try {
    const { id } = context.params;
    const res = await axios.get(`http://localhost:3001/api/blog/${id}`);
    console.log(res.data.data);
    if (res.data) {
      return {
        props: {
          blog: res.data.data,
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
