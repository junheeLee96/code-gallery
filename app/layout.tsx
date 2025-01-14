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
  description: "Share your dumb code.",
  icons: {
    icon: [
      { url: "/image/favicon.ico", sizes: "any" },
      { url: "/image/favicon-16x16.png", sizes: "16x16" },
      { url: "/image/favicon-32x32.png", sizes: "32x32" },
    ],
    apple: [{ url: "/image/apple-touch-icon.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased text-black dark:text-white">
        <Providers>
          <Header />
          <div className="min-w-screen min-h-screen flex justify-center pt-[56px] bg-white dark:bg-dark-bg">
            <div className="w-full lg:w-[680px] min-h-full">
              <div className="w-full h-full">{children}</div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
