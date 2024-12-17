"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  createLanguageStore,
  initLanguageStore,
} from "@/app/stores/languages-store";
import { LanguageStore } from "@/app/stores/types/language-store-type";

export type LanguageStoreApi = ReturnType<typeof createLanguageStore>;

export const LanguageStoreContext = createContext<LanguageStoreApi | undefined>(
  undefined
);

export interface LanguageStoreProviderProps {
  children: ReactNode;
}

export const LanugeageStoreProvider = ({
  children,
}: LanguageStoreProviderProps) => {
  const storeRef = useRef<LanguageStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createLanguageStore(initLanguageStore());
  }

  return (
    <LanguageStoreContext.Provider value={storeRef.current}>
      {children}
    </LanguageStoreContext.Provider>
  );
};

export const useLanguageStore = <T,>(
  selector: (store: LanguageStore) => T
): T => {
  const languageStoreContext = useContext(LanguageStoreContext);

  if (!languageStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(languageStoreContext, selector);
};
