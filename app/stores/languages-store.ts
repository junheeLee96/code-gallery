// src/stores/counter-store.ts
import { createStore } from "zustand/vanilla";
import { LanguageState, LanguageStore } from "./types/language-store-type";

export const initLanguageStore = (): LanguageState => {
  return { language: "whole" };
};

export const defaultInitState: LanguageState = {
  language: "whole",
};

export const createLanguageStore = (
  initState: LanguageState = defaultInitState
) => {
  return createStore<LanguageStore>()((set) => ({
    ...initState,
    setLanguage: (newLang) => set((state) => ({ ...state, language: newLang })),
  }));
};
