import localFont from "next/font/local";
import "./globals.css";
import AuthController from "./ui/auth/AuthController";
import { Metadata } from "next";
import Providers from "./providers";
import Image from "next/image";
import Link from "next/link";

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
      <Providers>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="fixed top-[0] left-[0] w-full bg-nav-background h-[56px] shadow-md">
            <div className="w-full h-full flex items-center justify-between px-8 ">
              <Link href="/">
                <Image
                  src="/image/logo.png"
                  width={100}
                  height={80}
                  alt="CodeGallery"
                />
              </Link>
              <div className="flex items-center">
                <AuthController />
              </div>
            </div>
          </header>
          <div className="min-w-screen min-h-screen flex justify-center pt-[56px]">
            <div className="w-full g:w-[680px] min-h-full ">
              <div className="w-full h-full">{children}</div>
            </div>
          </div>
        </body>
      </Providers>
    </html>
  );
}
