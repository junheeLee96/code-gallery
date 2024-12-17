"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkBreaks from "remark-breaks";

type MarkdownTypes = {
  markdown: string;
  language: string;
};

export default function Markdown({ markdown, language }: MarkdownTypes) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkBreaks]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(
            `language-${language}` || undefined
          );

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
              className={`${
                className ?? ""
              } bg-markdown-bg p-2 min-w-full block rounded text-white`}
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}
