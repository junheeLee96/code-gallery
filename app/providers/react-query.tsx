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
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
