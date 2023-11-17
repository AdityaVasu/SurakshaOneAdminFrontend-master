import { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import axios from "axios";

import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import "../../../node_modules/draft-js/dist/Draft.css"
import "../../css/editor.css"

import Navbar from "../navbar/navbar";

const BlogEditor = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [convertedContent, setConvertedContent] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    let html = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(html);
    console.log(html)
  }, [editorState]);

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html)
    }
  }

  const handlePublish = async () => {
    try {
      // Retrieve the authentication token from local storage
      const authToken = localStorage.getItem('authToken');
  
      // Set the authentication token in the headers
      const headers = {
        Authorization: authToken,
      };
  
      // Send the blog content and title to the server with the authentication token in the headers
      await axios.post('https://sljom89u8d.execute-api.us-east-1.amazonaws.com/dev/upload', {
        blogTitle: title,
        blogHTML: convertedContent,
      }, { headers });
      //console.log(convertedContent)
  
      console.log("Blog published successfully!");
    } catch (error) {
      console.error('Error publishing blog:', error);
    }
  };
  

  return (
    <div className="BlogEditor">
      <Navbar />
      <div>
  <div className="title-container">
    <label style={{ color: '#fff' }}>Title:</label>
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      style={{
        width: '500px',  // Adjust the width as needed
        padding: '12px', // Adjust the padding as needed
        fontSize: '16px', // Add your preferred font size here
      }}
    />
  </div>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1, marginRight:'20px' }}>
            <Editor
              defaultEditorState={editorState}
              onEditorStateChange={setEditorState}
              wrapperClassName="wrapper-class"
              editorClassName="editor-class"
              toolbarClassName="toolbar-class"
            />
          </div>
          <div style={{ flex: 1 }}>
            <header style={{color:'#fff', fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>PREVIEW</header>
            <div
              className="preview"
              dangerouslySetInnerHTML={createMarkup(convertedContent)}
            ></div>
          </div>
        </div>
        <div className="publish-button">
          <button onClick={handlePublish}>Publish</button>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
