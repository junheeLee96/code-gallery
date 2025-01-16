import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "./react-query-Provider";
import { ZustandProviders } from "./zustand";
import { ThemeProvider } from "./ThemeProvider";
import { ToastMessageProvider } from "./ToastMessageProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <ZustandProviders>
          <ToastMessageProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </ToastMessageProvider>
        </ZustandProviders>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
