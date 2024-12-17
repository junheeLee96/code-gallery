import { LanugeageStoreProvider } from "./language-store-provider";
import { SortingStoreProvider } from "./sorting-store.provider";

type ZustandProvidersTypes = {
  children: React.ReactNode;
};

export default function ZustandProviders({ children }: ZustandProvidersTypes) {
  return (
    <SortingStoreProvider>
      <LanugeageStoreProvider>{children}</LanugeageStoreProvider>
    </SortingStoreProvider>
  );
}
