import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS
import 'quill-emoji/dist/quill-emoji.css'; // Import Quill Emoji CSS
import { Quill } from 'react-quill';
// import "./App.css"


const Emoji = require('quill-emoji');
Quill.register('modules/emoji', Emoji);

const App = () => {
  const [editorContent, setEditorContent] = useState('');

  const handleEditorChange = (content, delta, source, editor) => {
    setEditorContent(content);
  };

  const modules = {
    toolbar: [
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['emoji'], 

    ],
    'emoji-toolbar': true,
    'emoji-textarea': false,
    'emoji-shortname': true,
  };

  const formats = [
    'size', 'bold', 'italic', 'underline',
    'list', 'bullet', 'color', 'background', 'emoji'
  ];

  return (
    <div className="text-editor">
    <ReactQuill
    className='editor'
      value={editorContent}
      onChange={handleEditorChange}
      modules={modules}
      formats={formats}
      placeholder="Compose something awesome..."
    />
  </div>
);
};

export default App;
