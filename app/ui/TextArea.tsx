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
    </div>
  );
}
