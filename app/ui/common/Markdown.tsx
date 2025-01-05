"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkBreaks from "remark-breaks";
import { ComponentPropsWithoutRef, CSSProperties } from "react";

type MarkdownTypes = {
  markdown: string;
  language: string;
  height?: number;
};

type CodeProps = ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
};

// SyntaxHighlighter의 style prop 타입 정의
type SyntaxHighlighterStyleProps = {
  [key: string]: CSSProperties;
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
                language={match[1]}
                PreTag="div"
                style={okaidia as SyntaxHighlighterStyleProps}
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
    </div>
  );
}
