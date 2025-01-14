import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "./react-query";
import { ZustandProviders } from "./zustand";
import { ThemeProvider } from "./Theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <ZustandProviders>
          <ThemeProvider>{children}</ThemeProvider>
        </ZustandProviders>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
