"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import remarkBreaks from "remark-breaks";
import { ComponentPropsWithoutRef } from "react";
import { okaidia } from "react-syntax-highlighter/dist/cjs/styles/prism";

type MarkdownTypes = {
  markdown: string;
  language: string;
  height?: number;
};

type CodeProps = ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
};

export default function Markdown({ markdown, language }: MarkdownTypes) {
  return (
    <div className="overflow-scroll py-3">
      <ReactMarkdown
        remarkPlugins={[remarkBreaks]}
        components={{
          code({ inline, className, children, ...props }: CodeProps) {
            const match = /language-(\w+)/.exec(`language-${language}` || "");

            return !inline && match ? (
              <SyntaxHighlighter
                {...props}
                language={match[1]}
                PreTag="div"
                style={okaidia}
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
    </div>
  );
}
