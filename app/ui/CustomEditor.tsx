"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import { Controlled as CodeMirror } from "react-codemirror2";
import "react-quill/dist/quill.snow.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";

const CustomEditor = () => {
  const [content, setContent] = useState("");
  const [code, setCode] = useState("");

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleCodeChange = (editor, data, value) => {
    setCode(value);
  };

  return (
    <div>
      {/* <ReactQuill value={content} onChange={handleContentChange} /> */}
      {/* <CodeMirror
        value={code}
        options={{
          mode: "javascript",
          theme: "material",
          lineNumbers: true,
        }}
        onBeforeChange={handleCodeChange}
      /> */}
    </div>
  );
};

export default CustomEditor;
