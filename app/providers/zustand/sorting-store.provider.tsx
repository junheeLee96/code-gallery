"use client";

import {
  createSortingStore,
  initSortingStore,
} from "@/app/stores/sorting-store";
import { SortingStore } from "@/app/stores/types/sorting-store-type";
import { createContext, ReactNode, useContext, useRef } from "react";
import { useStore } from "zustand";

export type SortingStoreApi = ReturnType<typeof createSortingStore>;

export const SortingStoreContext = createContext<SortingStoreApi | undefined>(
  undefined
);

export interface SortingStoreProviderProps {
  children: ReactNode;
}

export const SortingStoreProvider = ({
  children,
}: SortingStoreProviderProps) => {
  const storeRef = useRef<SortingStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createSortingStore(initSortingStore());
  }

  return (
    <SortingStoreContext.Provider value={storeRef.current}>
      {children}
    </SortingStoreContext.Provider>
  );
};

export const useSortingStore = <T,>(
  selector: (store: SortingStore) => T
): T => {
  const sortingStoreContext = useContext(SortingStoreContext);

  if (!sortingStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(sortingStoreContext, selector);
};
