import { SessionProvider } from "next-auth/react";
import ReactQueryProvider from "./react-query";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </SessionProvider>
  );
}
