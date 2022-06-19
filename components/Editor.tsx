import { EditorState } from "draft-js";
// import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorProps } from "react-draft-wysiwyg";

import dynamic from "next/dynamic";
import { useState } from "react";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from "draft-convert";

interface RichTextEditorProps {}

const RichTextEditor: React.FC<RichTextEditorProps> = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState<any>();

  const handleSave = () => {
    console.log(editorState);
    console.log(convertedContent);
  };

  const handleEditorChange = (state:any) => {
    setEditorState(state);
    convertContentToHTML();
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }

  return (
    <div className="App">
      <header className="App-header">Rich Text Editor Example </header>
      <button onClick={handleSave}>Save</button>
      <Editor
        editorState={editorState}
        // onChange={setEditorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
    </div>
  );
};

export default RichTextEditor;
