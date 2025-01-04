import {
  LanugeageStoreProvider,
  useLanguageStore,
} from "./language-store-provider";
import {
  SortingStoreProvider,
  useSortingStore,
} from "./sorting-store.provider";
import { TimePeriodStoreProvider } from "./timePeriods-store-provider";

type ZustandProvidersTypes = {
  children: React.ReactNode;
};

export function ZustandProviders({ children }: ZustandProvidersTypes) {
  return (
    <SortingStoreProvider>
      <TimePeriodStoreProvider>
        <LanugeageStoreProvider>{children}</LanugeageStoreProvider>
      </TimePeriodStoreProvider>
    </SortingStoreProvider>
  );
}

export { useSortingStore, useLanguageStore };
