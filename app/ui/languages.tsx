"use client";

import { ChangeEvent } from "react";
import { languages } from "../lib/languages";

type LanguagesProps = {
  // "전체" 옵션 활성화
  isWholeRender?: boolean;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
};

export default function Languages({ isWholeRender, onChange }: LanguagesProps) {
  return (
    <select
      id="languages"
      name="language"
      className="text-red-500"
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
