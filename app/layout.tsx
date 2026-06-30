import type { Metadata } from "next";
import { Oswald, PT_Serif, Roboto } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ptSerif = PT_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const roboto = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ACC — Marbled Beef of the Highest Quality",
  description: "ACC — premium marbled beef raised with care in ecologically clean regions.",
  icons: {
    icon: "/images/acc-logo.svg",
    shortcut: "/images/acc-logo.svg",
    apple: "/images/acc-logo.svg",
  },
  openGraph: {
    title: "ACC — Marbled Beef",
    description: "ACC — premium marbled beef of the highest quality.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${ptSerif.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
