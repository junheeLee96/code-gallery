import {
  LanugeageStoreProvider,
  useLanguageStore,
} from "./language-store-provider";
import {
  SortingStoreProvider,
  useSortingStore,
} from "./sorting-store.provider";

type ZustandProvidersTypes = {
  children: React.ReactNode;
};

export function ZustandProviders({ children }: ZustandProvidersTypes) {
  return (
    <SortingStoreProvider>
      <LanugeageStoreProvider>{children}</LanugeageStoreProvider>
    </SortingStoreProvider>
  );
}

export { useSortingStore, useLanguageStore };
