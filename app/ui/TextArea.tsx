"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkBreaks from "remark-breaks";

export default function Textarea() {
  const [markdown, setMarkdown] = useState("");

  // todo:React marker에 jest와의 오류가 잇음
  return (
    <div>
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        placeholder="``` code ```을 통해 코드를 작성할 수 있습니다"
        className="w-full h-[400px] bg-transparent"
        name="markdownContent"
      />
      <ReactMarkdown
        children={markdown}
        remarkPlugins={[remarkBreaks]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                language={match[1]}
                PreTag="div"
                style={okaidia}
                {...props}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            ) : (
              <code
                className={`${className} bg-gray-500 p-2 min-w-full block`}
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      />
    </div>
  );
}
