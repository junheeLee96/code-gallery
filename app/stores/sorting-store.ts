import { createStore } from "zustand/vanilla";
import { SortingState, SortingStore } from "./types/sorting-store-type";

export const initSortingStore = (): SortingState => {
  return { sorting: "recent" };
};

export const defaultInitState: SortingState = {
  sorting: "recent",
};

export const createSortingStore = (
  initState: SortingState = defaultInitState
) => {
  return createStore<SortingStore>()((set) => ({
    ...initState,
    setSorting: (sort) => set((state) => ({ ...state, sorting: sort })),
  }));
};
