import { CounterStoreProvider } from "./counter-store-provider";
import { LanugeageStoreProvider } from "./language-store-provider";

type ZustandProvidersTypes = {
  children: React.ReactNode;
};

export default function ZustandProviders({ children }: ZustandProvidersTypes) {
  return (
    <LanugeageStoreProvider>
      <CounterStoreProvider>{children}</CounterStoreProvider>
    </LanugeageStoreProvider>
  );
}
