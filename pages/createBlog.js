import { useState } from 'react';
import Head from 'next/head';
import { EditorState, convertToRaw } from 'draft-js';
import dynamic from 'next/dynamic';
import { Button } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import { toast } from 'react-toastify';
import axios from 'axios';

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
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorData, setEditorData] = useState(
    convertToRaw(editorState?.getCurrentContent())
  );
  const [title, setTitile] = useState('');
  const [tags, setTags] = useState([]);

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
    if (!editorState.getCurrentContent().hasText()) {
      toast.error(`Blog Content Required`);
      return;
    }
    if (!title) {
      toast.error(`Title is required`);
      return;
    }
    const data = {
      title: title,
      tags: tags,
      content: JSON.stringify(editorData),
    };
    try {
      const res = await axios.post('/api/blog', data);
      if (res.data) {
        toast.success(res.data.msg);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="create-blog">
      <Head>
        <title>BlogsHub | Create</title>
      </Head>
      <form className="form">
        <input
          className="input"
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitile(e.target.value.trim())}
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
        <Button className="btn" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}
