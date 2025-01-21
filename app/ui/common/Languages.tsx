"use client";

import { ChangeEvent } from "react";
import { languages } from "../../lib/options";
import Select from "./Select";

type LanguagesProps = {
  // "전체" 옵션 활성화
  isWholeRender?: boolean;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
};

export default function Languages({
  isWholeRender,
  onChange,
  value,
}: LanguagesProps) {
  return (
    <Select onChange={onChange && onChange} value={value} label="언어">
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
