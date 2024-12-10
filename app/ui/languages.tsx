import { languages } from "../lib/languages";

type LanguagesProps = {
  // "전체" 옵션 활성화
  isWholeRender?: boolean;
};

export default function Languages({ isWholeRender }: LanguagesProps) {
  return (
    <select id="languages" name="language" className="text-red-500">
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
