import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "./react-query";
// import { ZustandProviders } from "./zustand";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        {/* <ZustandProviders> */}
        {children}
        {/* </ZustandProviders> */}
      </ReactQueryProvider>
    </SessionProvider>
  );
}
