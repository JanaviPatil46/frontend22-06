import React, { useState } from 'react';
import { EditorState, convertToRaw, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


const TextEditor = ({ onDescriptionChange, selectedText }) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [showShortcodes, setShowShortcodes] = useState(false);
    const [selectedShortcode, setSelectedShortcode] = useState(null);
    const [shortcodes] = useState([
        { title: 'Account', items: [
            { name: 'Account Name 1', value: '[Account Name]' },
            { name: 'Account Name 2', value: '[account2]' },
            // Add more account names as needed
        ]},
        { title: 'Contact', items: [
            { name: 'Contact Name 1', value: '[contact1]' },
            { name: 'Contact Name 2', value: '[contact2]' },
            // Add more contact names as needed
        ]},
        // Add more titles and corresponding names as needed
    ]);

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
    };



    return (
        <div style={{marginTop:'20px',borderRadius:"12px",margin:'10px'}} className="text-editor">
            <div className="editor">
                <Editor
                  
                  editorStyle={{height:'250px'}}
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                    placeholder='Enter your text here...'
                />
            </div>
          
        </div>
    );
};

export default TextEditor;
