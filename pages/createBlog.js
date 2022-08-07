import { useState } from 'react';
import Head from 'next/head';
import { EditorState, convertToRaw } from 'draft-js';
import dynamic from 'next/dynamic';
import { Button, Typography } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

const tagsOptions = [
  { key: 'Education', value: 'Education' },
  { key: 'Science', value: 'Science' },
  { key: 'Entertainment', value: 'Entertainment' },
  { key: 'Sports', value: 'Sports' },
  { key: 'Technology', value: 'Technology' },
  { key: 'Children', value: 'Children' },
];

export default function CreateBlog(props) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorData, setEditorData] = useState(
    convertToRaw(editorState?.getCurrentContent())
  );
  const [title, setTitile] = useState('');
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  function handleEditorChange(editorState) {
    setEditorState(editorState);
    setEditorData(convertToRaw(editorState.getCurrentContent()));
  }

  const handleChipClick = (label) => {
    const tmp = [...tags];
    if (tmp.findIndex((i) => i === label) !== -1) {
      tmp.splice(
        tmp.findIndex((i) => i === label),
        1
      );
    } else {
      tmp.push(label);
    }
    setTags(tmp);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!editorState.getCurrentContent().hasText()) {
      toast.error(`Blog Content Required`);
      setLoading(false);
      return;
    }
    if (!title) {
      toast.error(`Title is required`);
      setLoading(false);
      return;
    }
    const data = {
      title: title,
      tags: tags,
      content: JSON.stringify(editorData),
    };
    try {
      const res = await axios.post('/api/auth/blog', data);
      if (res.data) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="create-blog">
      <Head>
        <title>BlogsHub | Create</title>
      </Head>
      {status === 'loading' ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography className="intro-text">Loading...</Typography>
        </div>
      ) : status === 'authenticated' ? (
        <form className="form">
          <input
            className="input"
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitile(e.target.value)}
          />
          <div className="chips-wrapper">
            {tagsOptions &&
              tagsOptions.map((item, i) => (
                <div
                  className="chip"
                  key={i}
                  label={item.key}
                  onClick={(e) => handleChipClick(item.key)}
                >
                  {tags.findIndex((p) => p === item.key) !== -1 && (
                    <DoneIcon style={{ fontSize: '16px', color: '#3CCF4E' }} />
                  )}
                  {item.value}
                </div>
              ))}
          </div>
          <div className="editor-wrapper">
            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={handleEditorChange}
            />
          </div>
          <Button disabled={loading} className="btn" onClick={handleSubmit}>
            Submit
          </Button>
        </form>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography className="intro-text">
            Please
            <span className="span" onClick={(e) => router.push('/login')}>
              <strong> Login </strong>
            </span>
            to access this feature.
          </Typography>
        </div>
      )}
    </div>
  );
}
