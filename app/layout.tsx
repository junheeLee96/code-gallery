import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AuthController from "./ui/auth/AuthController";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "CodeGallery",
  description: "code-gallery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="fixed top-[0] left-[0] w-full bg-nav-background h-[56px] shadow-md">
          <div className="w-full h-full flex items-center justify-between px-8 lg:px-48 ">
            <div>Code Gal</div>
            <div className="flex items-center">
              <span className="mr-1">SIGN</span>
              <AuthController />
            </div>
          </div>
        </header>
        <div className="min-w-screen min-h-screen flex justify-center pt-[56px]">
          <main className="w-full g:w-[680px] h-full p-2">
            <div className="w-full ">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
