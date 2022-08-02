import { useState } from 'react';
// import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import dynamic from 'next/dynamic';
import { Button } from '@material-ui/core';

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);

export default function CreateBlog(props) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorData, setEditorData] = useState(
    convertToRaw(editorState?.getCurrentContent())
  );

  function handleEditorChange(editorState) {
    setEditorState(editorState);
    setEditorData(convertToRaw(editorState.getCurrentContent()));
  }

  return (
    <div className="create-blog">
      <form className="form">
        <input className="input" type="text" placeholder="Blog Title" />
        <div className="editor-wrapper">
          <Editor
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={handleEditorChange}
          />
        </div>
        <Button className="btn">Submit</Button>
      </form>
    </div>
  );
}
