"use client";

import { ChangeEvent } from "react";
import { languages } from "../../lib/options";
import Select from "./Select";

interface LanguagesProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  // "전체" 옵션 활성화
  isWholeRender?: boolean;
  value: string;
  name: string;
}

export default function Languages({
  isWholeRender,
  onChange,
  value,
  name,
}: LanguagesProps) {
  return (
    <Select
      onChange={onChange && onChange}
      value={value}
      label="언어"
      name={name}
    >
      {languages.map((lang, idx) =>
        !isWholeRender && lang.value === "whole" ? null : (
          <option key={idx} value={lang.value}>
            {lang.name}
          </option>
        )
      )}
    </Select>
  );
}
