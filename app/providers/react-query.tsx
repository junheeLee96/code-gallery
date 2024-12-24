"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type ReactQueryProviderTypes = {
  children: React.ReactNode;
};

export default function ReactQueryProvider({
  children,
}: ReactQueryProviderTypes) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      {/* todo: ReactQueryDevtools 동작안함 */}
      {/* <ReactQueryDevtools
        initialIsOpen={process.env.NEXT_PUBLIC_MODE === "local"}
      /> */}
    </QueryClientProvider>
  );
}
