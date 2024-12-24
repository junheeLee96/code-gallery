import localFont from "next/font/local";
import "./globals.css";
import { Metadata } from "next";
import Providers from "./providers";
import Header from "./ui/common/header";

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
          <Header />
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
