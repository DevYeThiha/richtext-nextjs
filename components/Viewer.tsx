import { EditorState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorProps } from "react-draft-wysiwyg";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML, convertFromHTML } from "draft-convert";

interface RichTextViewerProps {}


const defaultEditorState = () => {
  if(typeof window !== 'undefined'){
    return EditorState.createWithContent(convertFromHTML("<h3>Hello</h3>"));
  }else{
    return EditorState.createEmpty();
  }
}

const RichTextViewer: React.FC<RichTextViewerProps> = () => {
  const [editorState, setEditorState] = useState(defaultEditorState);
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
      <header className="App-header">Rich Text Viewer Example </header>
      <Editor
        editorState={editorState}
        toolbarHidden
        onEditorStateChange={handleEditorChange}
        wrapperClassName="viewer-wrapper-class"
        editorClassName="viewer-editor-class"
        readOnly={true}
      />
    </div>
  );
};

export default RichTextViewer;
