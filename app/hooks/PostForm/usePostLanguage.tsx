import { ChangeEvent, useState } from "react";

type usePostLanguageProps = {
  InitialLanguage: string;
};

export default function usePostLanguage({
  InitialLanguage,
}: usePostLanguageProps) {
  const [language, setLanguage] = useState(InitialLanguage);

  function handleLanguage(e: ChangeEvent<HTMLSelectElement>) {
    setLanguage(e.target.value);
  }

  return { language, handleLanguage };
}
