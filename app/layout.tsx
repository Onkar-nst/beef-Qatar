import type { Metadata } from "next";
import { Fraunces, Lora, Inter } from "next/font/google";
import "./globals.css";

// Display, premium editorial serif (replaces the old condensed sans)
const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Saqr, Premium Halal Meats of Qatar",
  description:
    "Saqr, premium, 100% Halal certified beef and lamb, expertly cut and delivered across Qatar. Source to table, with a single standard of excellence.",
  icons: {
    icon: "/images/saqr-emblem.svg",
    shortcut: "/images/saqr-emblem.svg",
    apple: "/images/saqr-emblem.svg",
  },
  openGraph: {
    title: "Saqr, Premium Halal Meats",
    description:
      "Premium, 100% Halal certified beef and lamb for Qatar, source to table.",
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
      className={`${fraunces.variable} ${lora.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
