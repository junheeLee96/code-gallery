"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import {
  createLanguageStore,
  initLanguageStore,
} from "@/app/stores/languages-store";
import { LanguageStore } from "@/app/stores/types/language-store-type";

export type LanguageStoreApi = ReturnType<typeof createLanguageStore>;

export const CounterStoreContext = createContext<LanguageStoreApi | undefined>(
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
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  );
};

export const useLanguageStore = <T,>(
  selector: (store: LanguageStore) => T
): T => {
  const LanguageStoreContext = useContext(CounterStoreContext);

  if (!LanguageStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(LanguageStoreContext, selector);
};
