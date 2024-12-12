export type LanguageType = string;

export type LanguageState = {
  language: LanguageType;
};

export type LanguageActions = {
  setLanguage: (language: string) => void;
};

export type LanguageStore = LanguageState & LanguageActions;
