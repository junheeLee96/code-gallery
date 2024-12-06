"use client";

import React, { ChangeEvent, useState } from "react";

type TextareaTypes = {
  markdown: string;
  onMarkdownChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function Textarea({
  markdown,
  onMarkdownChange,
}: TextareaTypes) {
  return (
    <div>
      <textarea
        value={markdown}
        onChange={onMarkdownChange}
        placeholder="``` code ```을 통해 코드를 작성할 수 있습니다"
        className="w-full h-[400px] bg-transparent"
        name="markdownContent"
      />
      {/* <ReactMarkdown
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
      /> */}
    </div>
  );
}
