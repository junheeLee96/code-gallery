"use client";

import React, { ChangeEvent } from "react";

interface TextareaTypes
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  markdown: string;
  onMarkdownChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function Textarea({
  markdown,
  onMarkdownChange,
  className,
}: TextareaTypes) {
  return (
    <div>
      <textarea
        value={markdown}
        onChange={onMarkdownChange}
        placeholder="``` code ```을 통해 코드를 작성할 수 있습니다"
        className={
          `w-full bg-white p-2 border border-gray-200 rounded dark:bg-dark-bg dark:border-black ` +
          className
        }
        name="markdownContent"
      />
    </div>
  );
}
