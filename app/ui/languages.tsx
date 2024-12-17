"use client";

import { ChangeEvent } from "react";
import { languages } from "../lib/options";

type LanguagesProps = {
  // "전체" 옵션 활성화
  isWholeRender?: boolean;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
};

export default function Languages({ isWholeRender, onChange }: LanguagesProps) {
  return (
    <select
      className="block bg-white border border-gray-300 text-gray-900 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-5"
      id="languages"
      name="language"
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange?.(e)}
    >
      {languages.map((lang, idx) =>
        !isWholeRender && lang.value === "whole" ? null : (
          <option key={idx} value={lang.value}>
            {lang.name}
          </option>
        )
      )}
    </select>
  );
}
